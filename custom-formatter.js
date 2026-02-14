// custom-formatter.js
function format(results) {
  let output = "";
  results.forEach((result) => {
    if (result.messages.length > 0) {
      output += `${result.filePath}\n`;
      // Show only ONE message per file
      output += `  Please enter pnpm lint:fix to fix the error!\n`;
    }
  });
  return output || "✅ No issues found!";
}

export default format;
