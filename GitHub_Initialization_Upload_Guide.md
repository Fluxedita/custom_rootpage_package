To initialize a project in VSCode and upload it to a new GitHub repository on the main branch, here’s a clean step-by-step workflow:

🛠️ 1. Initialize Your Project Locally
Open your project folder in VSCode and run the following in the terminal:
git init
This initializes a new Git repository in your project directory.

2. Create a .gitignore File (basic .gitignore already inclded, amend as you wish)
Add a .gitignore file to exclude files you don’t want in version control (e.g., node_modules, .env, etc.). You can use templates from gitignore.io for your tech stack.

3. Stage and Commit Your Files
git add .

4.  Commit your files
git commit -m "Initial commit"

5. Create a New GitHub Repository
Go to GitHub and create a new repository. Do not initialize it with a README or .gitignore, these are included in your Fluxedita Package (ammend as required locally).

6. Link Your Local Repo to GitHub
Replace USERNAME and REPO with your GitHub username and repo name:

git remote add origin https://github.com/YOUR_USERNAME/REPO.git

7. Push to the main Branch
Ensure your local branch is named main (or rename it if needed):

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Fluxedita/custom_rootpage_package.git
git push -u origin main

🧠 Bonus Tips
If you have made changes, and wish to update your existing repo, please follow these steps:

git status
git add .
git commit -m "Push latest changes"
git push origin main