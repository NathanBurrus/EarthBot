const Discord = require("discord.js");

const client = new Discord.Client();

var prefix = "/";

client.login("NDY0MTAyNTk1MjA0NjEyMDk2.Dh6FDg.eze4f5cTxTDbs0OPDGvsvYrvQCo");

client.on("ready", () => {
    console.log("bot ready")
    client.user.setGame("Besion d'aide ? /menu");
});

client.on('message', message => {
//menu global
//admin et joueur

if(message.content === prefix + "menu"){
    var site_embed = new Discord.RichEmbed() 
    .setColor("#000000")
    .addField(":interrobang: /aide", "Commande d'aide")
    .addField(":wrench: /admin", "commandes d'Admin")
    .setFooter("EarthSky - Serveur minecraft 1.12.2")
    message.channel.sendMessage(site_embed);
    console.log("menu send")
}

//custom commandes
//all players

    if(message.content === prefix + "site"){
        var site_embed = new Discord.RichEmbed() 
        .setColor("#000000")
        .setTitle("notre site")
        .addField("http://earthsky.fr/", "lien vers le site")
        .setFooter("EarthSky - Serveur minecraft 1.12.2")
        message.channel.sendMessage(site_embed);
        console.log("site link send")
    }

    if(message.content === prefix + "boutique"){
        var infos_embed = new Discord.RichEmbed()
        .setColor("#660033")
        .setTitle("boutique")
        .addField("http://earthsky.fr/boutique.php", "lien vers notre boutique")
        .setFooter("EarthSky - Serveur minecraft 1.12.2")
        message.channel.sendMessage(infos_embed);
        console.log("infos menu send succefuly !") 
    } 

    if(message.content === prefix + "admin"){
        var infos_embed = new Discord.RichEmbed()
        .setColor("#660033")
        .setTitle("admin menu")
        .addField("/ban", "ban @")
        .addField("/kick", "kick @")
        .addField("/mute et /unmute", "/mute ou /unmute @")
        .setFooter("EarthSky - Serveur minecraft 1.12.2")
        message.channel.sendMessage(infos_embed);
        console.log("infos menu send succefuly !") 
    } 
//cmds modération
//role avec perm de ban kick manager message

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Précise un numéro de message a suprimer!")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} message on été effacer avec succés !`);
            console.log("des message on été supprimé")
        })
    }


    if(message.content.startsWith(prefix + "gkick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");
        if(message.mentions.users.size === 0) {
            return message.channel.send("Format invalide, vérifier que vous avez bien mentioner un membres !")
        }
        var kick = message.guild.member(message.mentions.users.first())
        if(!kick) {
            return message.channel.send("Es-ce-que cette utilisateur existe ??")
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission !")
        }
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "gban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");
        if(message.mentions.users.size === 0) {
            return message.channel.send("Format invalide, vérifier que vous avez bien mentioner un membres !")
        }
        var ban = message.guild.member(message.mentions.users.first())
        if(!ban) {
            return message.channel.send("Es-ce-que cette utilisateur existe ??")
        }
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission !")
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} a été banni par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute par ${message.author.username} !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} est un-mute par ${message.author.username} !`);
        })
    }

});