const { 
    Client, 
    GatewayIntentBits, 
    ActivityType,
    Events
} = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

function hasValidStatus(activities) {
    const aboutMe = activities.find(a => a.type === ActivityType.Custom)?.state;
    return aboutMe && (
        aboutMe.includes('.gg/YOUR_LINK_HERE') ||
        aboutMe.includes('discord.gg/YOUR_LINK_HERE') ||
        aboutMe.includes('https://discord.gg/YOUR_LINK_HERE')
    );
}

async function checkAndUpdateRole(member) {
    try {
        const activities = member.presence?.activities || [];
        const shouldHaveRole = hasValidStatus(activities);
        const role = member.guild.roles.cache.get(config.bot.roleId);

        if (!role) {
            console.log(`[ERROR] Role with ID ${config.bot.roleId} not found!`);
            return;
        }

        const hasRole = member.roles.cache.has(config.bot.roleId);

        if (shouldHaveRole && !hasRole) {
            await member.roles.add(role);
            console.log(`[SUCCESS] Role added for ${member.user.tag}`);
            
            const dmMessage = 
                "🎉 **Congratulations!** 🎉\n\n" +
                `Hello ${member.toString()},\n\n` +
                "you have just received the XXX role! 🌟\n" +
                "Thank you for actively participating in our community and sharing our link in your status. 🤝\n\n" +
                "Best regards,\n" +
                "Your XXX Server-Team";

            try {
                await member.send(dmMessage);
            } catch (error) {
                console.log(`[INFO] Could not send DM to ${member.user.tag}`);
            }
        } 
        else if (!shouldHaveRole && hasRole) {
            await member.roles.remove(role);
            console.log(`[INFO] Role removed from ${member.user.tag}`);
        }
    } catch (error) {
        console.error(`[ERROR] Error updating role for ${member.user.tag}:`, error);
    }
}

client.once(Events.ClientReady, async () => {
    console.log(`[START] Bot is online as ${client.user.tag}`);
    
    const guild = client.guilds.cache.get(config.bot.guildId);
    if (guild) {
        console.log('[START] Performing initial role check...');
        const members = await guild.members.fetch();
        for (const [_, member] of members) {
            await checkAndUpdateRole(member);
        }
        console.log('[START] Initial role check completed');
    }
});

client.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {
    if (!newPresence.member) return;
    await checkAndUpdateRole(newPresence.member);
});

client.on('error', error => {
    console.error('[ERROR] Discord Client Error:', error);
});

process.on('unhandledRejection', error => {
    console.error('[ERROR] Unhandled Promise Rejection:', error);
});

client.login(config.bot.token);