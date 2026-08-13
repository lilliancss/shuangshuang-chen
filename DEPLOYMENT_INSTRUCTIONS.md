# Deploying Dr. Shuangshuang Chen’s Academic Website

This is a plain static website. It does not require a build step, `npm install`, server-side code, or a backend.

## Deploy with GitHub Pages

1. Create a [GitHub account](https://github.com/signup) if you do not already have one.
2. Sign in to GitHub and create a new **public repository**.
3. Use the recommended repository name: `shuangshuang-chen`.
4. Open the `Chen_Shuangshuang_Website_GitHub_Pages` folder on your computer.
5. Upload **all files inside that folder** to the repository root. Do not upload the containing folder itself.
6. Commit the uploaded files. Suggested commit message: `Initial academic website`.
7. In the GitHub repository, open **Settings → Pages**.
8. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
9. Click **Save**.
10. Wait a few minutes for GitHub Pages to publish the website.

The website should then be available at:

`https://YOUR-GITHUB-USERNAME.github.io/shuangshuang-chen/`

Replace `YOUR-GITHUB-USERNAME` with your GitHub username.

## Updating the website later

Upload the revised files to the repository root and commit the changes. GitHub Pages will republish the website automatically.

## Optional custom domain

After the GitHub Pages version is working correctly, a custom domain such as `shuangshuangchen.com` can be connected through **Settings → Pages → Custom domain**. Do not configure the custom domain until you own it and the standard GitHub Pages address is working.

## Public-file reminder

Upload only the files in `Chen_Shuangshuang_Website_GitHub_Pages`. Do not upload `CV.docx`, draft documents, temporary files, or `.DS_Store`.
