import { Octokit } from "octokit/rest";

const uploadImageToGitHub= async(imagePath)=>{
  const octokit = new Octokit({ auth: "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" });
  const date = new Date();
  const content = fs.readFileSync(imagePath, { encoding: "base64" });
  console.log()
  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: "liptwo",
      repo: "images",
      path: `images/${`${date}+${path.basename(imagePath)}`}`, // Đường dẫn trong repository
      message: "Upload new image",
      content: content,
      committer: {
        name: "liptwo",
        email: "liptwo0@gmail.com",
      },
      author: {
        name: "liptwo",
        email: "liptwo0@gmail.com",
      },
    });

    console.log("Image uploaded successfully:", response.data.content.html_url);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
export default uploadImageToGitHub;

// Gọi hàm để tải ảnh lên
