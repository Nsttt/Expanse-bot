const { Client, RichEmbed } = require("discord.js");
const client = new Client();
const TOKEN = require("./config.json");

let dicc = {
  ecolor1 : "Dark Blue",
  ecolor2 : "Gray Blue",
  ecolor3 : "Dark Green",
  ecolor4 : "Green",
  ecolor5 : "Orange",
  ecolor6 : "Yellow",
  ecolor7 : "Pink",
  ecolor8 : "Purple",
  ecolor9 : "Red",
  ecolor10 : "White"
}

client.login(TOKEN.token);

client.on("ready", () => {
  console.log("Logged in!");
});

client.on("message", message => {
  if (message.author.bot) {
    if (message.embeds) {
      const embedMsg = message.embeds.find(msg => msg.title === "Colour Roles");
      if (embedMsg) {
        embedMsg.message
          .react("662707568476553216")
          .then(reaction => reaction.message.react("662709269103116319"))
          .then(reaction => reaction.message.react("662709276028043264"))
          .then(reaction => reaction.message.react("662709281740685314"))
          .then(reaction => reaction.message.react("662709289009414145"))
          .then(reaction => reaction.message.react("662709294839496784"))
          .then(reaction => reaction.message.react("662709300724105219"))
          .then(reaction => reaction.message.react("662709307741044736"))
          .then(reaction => reaction.message.react("662709314074443816"))
          .then(reaction => reaction.message.react("662709319321518100"))
          .catch(err => console.error(err));
      }
    }
    return;
  }

  if (message.content.toLowerCase() === "?roles") {
    const embed = new RichEmbed();
    embed.setTitle("Colour Roles");
    embed.setColor("BLUE");
    embed.setDescription(
      "<:ecolor1:662707568476553216> - Dark Blue\n" +
        "<:ecolor2:662709269103116319> - Gray Blue\n" +
        "<:ecolor3:662709276028043264> - Dark Green\n" +
        "<:ecolor4:662709281740685314> - Green\n" +
        "<:ecolor5:662709289009414145> - Orange\n" +
        "<:ecolor6:662709294839496784> - Yellow\n" +
        "<:ecolor7:662709300724105219> - Pink\n" +
        "<:ecolor8:662709307741044736> - Purple\n" +
        "<:ecolor9:662709314074443816> - Red\n" +
        "<:ecolor10:662709319321518100> - White\n"
    );
    message.channel.send(embed);
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (user.bot) {
    return;
  }

  let roleName = reaction.emoji.name;
  let role = reaction.message.guild.roles.find(
    role => role.name === dicc[roleName]
  );
  let member = reaction.message.guild.members.find(
    member => member.id === user.id
  );

  member
  .addRole(role.id)
  .then(member => {
    console.log("Added " + member.user.username + "to a role.");
  })
  .catch(err => console.error(err));
});

client.on("messageReactionRemove", (reaction, user) => {
  if (user.bot) {
    return;
  }

  let roleName = reaction.emoji.name;
  let role = reaction.message.guild.roles.find(
    role => role.name === dicc[roleName]
  );
  let member = reaction.message.guild.members.find(
    member => member.id === user.id
  );

  if (member.roles.has(role.id)) {
    member.removeRole(role.id)
      .then(member => {
        console.log(
          "Removed" + member.user.username + "from the" + role.name + "role."
        );
      })
      .catch(err => console.error(err));
  }
});
