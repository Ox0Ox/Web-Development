const fs = require('fs');
const path = require('path');

const folderPath = 'C:\\Users\\xlabb\\Desktop\\HP\\Web Development\\Clutter Folder\\Clutter'; // Replace with your folder path

fs.readdir(folderPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const fileExtension = path.extname(file).substring(1); // Get the file extension without the dot
        const extensionFolderPath = path.join(folderPath, fileExtension);
        console.log(extensionFolderPath);
        // Create a folder for the extension if it doesn't exist
        if (!fs.existsSync(extensionFolderPath)) {
            fs.mkdirSync(extensionFolderPath);
        }

        // Move the file to the extension folder
        const oldPath = path.join(folderPath, file);
        console.log('old path',oldPath);
        const newPath = path.join(extensionFolderPath, file);
        console.log('new path', newPath);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                return console.log('Error moving file: ' + err);
            }
            console.log(`Moved ${file} to ${extensionFolderPath}`);
        });
    });
});