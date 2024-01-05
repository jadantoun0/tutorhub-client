// method to retrieve the file name from the path file returned by the server
export const getFileName = (filePath) => {
    const fileNameWithTimestamp = filePath.split('/').pop();
    const fileNameWithoutTimestamp = fileNameWithTimestamp.split('-').slice(0, -2).join('-');
    // Remove the "-file" from the end
    const finalFileName = fileNameWithoutTimestamp.replace(/-file$/, '');
    // Remove parentheses and their contents
    const fileNameWithoutParentheses = finalFileName.replace(/\([^)]+\)/, '');
    return fileNameWithoutParentheses.trim();
};

// method to return the file type
export const getFileType = (filePath) => {
    const fileName = getFileName(filePath);
    const fileType = fileName.split('.').pop();
    return fileType.toLowerCase();
};