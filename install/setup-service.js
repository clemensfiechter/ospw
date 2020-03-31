var fs = require('fs');

const serviceFile = 'ospw.service';

const originalFileContents = '[Unit]\n\
Description=OSPW\n\
StartLimitIntervalSec=0\n\
\n\
[Service]\n\
Restart=always\n\
RestartSec=1\n\
ExecStart=/home/REPLACE/ospw/ospw.sh\n\
User=REPLACE\n\
\n\
[Install]\n\
WantedBy=multi-user.target\n'

var fileContents;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUsernameAndWriteToFile() {
  var replaced;

  readline.question('Type in your username: ', username => {

    replaced = fileContents.replace(/REPLACE/g, username);

    fs.writeFile(serviceFile, replaced, 'utf8', function (err) {
      console.log(`Writing username \'${username}\' into file...`);

      if (err) return console.log(err);
    });

    readline.close();
  });


}

function main() {
  console.log('***** Customizing service file *****');

  fs.readFile(serviceFile, 'utf8', function (err,data) {
    fileContents = data;
    if (data.indexOf('REPLACE') == -1) {
      console.log('Service file already initialized!');
      readline.question('Initialize again? (Y/n) ', yn => {
        if (yn === 'Y' || yn === 'y' || yn == undefined) {
          fileContents = originalFileContents;
          promptUsernameAndWriteToFile();
        } else {
          console.log("Exiting...");
          readline.close();
        }
      });
    } else {
      promptUsernameAndWriteToFile();
    }
  });


}

main();
