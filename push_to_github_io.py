import shutil, os, subprocess, sys

src = r"d:\CIVS2026-1-RLtuibian\THETA-Lab-Website"
dst_parent = r"d:\CIVS2026-1-RLtuibian"
repo_url = "https://github.com/nwj6688/nwj6688.github.io.git"
clone_dir = os.path.join(dst_parent, "nwj6688_github_io_new")

# Remove old clone if exists
if os.path.exists(clone_dir):
    shutil.rmtree(clone_dir)

# Clone
subprocess.run(["git", "clone", repo_url, clone_dir], check=True, cwd=dst_parent)

# Delete everything except .git
for item in os.listdir(clone_dir):
    item_path = os.path.join(clone_dir, item)
    if item == ".git":
        continue
    if os.path.isdir(item_path):
        shutil.rmtree(item_path)
    else:
        os.remove(item_path)

# Copy all files from THETA-Lab-Website (excluding .git)
for item in os.listdir(src):
    item_path = os.path.join(src, item)
    dst_path = os.path.join(clone_dir, item)
    if item == ".git":
        continue
    if os.path.isdir(item_path):
        shutil.copytree(item_path, dst_path, ignore=shutil.ignore_patterns(".git"))
    else:
        shutil.copy2(item_path, dst_path)

print("Files copied successfully!")

# List the files
for item in os.listdir(clone_dir):
    if item != ".git":
        print(f"  {item}")

print("\nReady to commit and push!")
