import shutil, os, subprocess, sys

src = r"d:\CIVS2026-1-RLtuibian\THETA-Lab-Website"
dst_parent = r"d:\CIVS2026-1-RLtuibian"
repo_url = "https://github.com/nwj6688/nwj6688.github.io.git"
clone_dir = r"d:\nwj6688_github_io"  # Use a dir outside the parent repo

# Remove old clone if exists
if os.path.exists(clone_dir):
    shutil.rmtree(clone_dir)

# Clone
print("Cloning...")
subprocess.run(["git", "clone", repo_url, clone_dir], check=True, cwd="d:/")

# Delete everything except .git
print("Cleaning...")
for item in os.listdir(clone_dir):
    item_path = os.path.join(clone_dir, item)
    if item == ".git":
        continue
    if os.path.isdir(item_path):
        shutil.rmtree(item_path)
    else:
        os.remove(item_path)

# Copy all files from THETA-Lab-Website (excluding .git)
print("Copying files...")
for item in os.listdir(src):
    item_path = os.path.join(src, item)
    dst_path = os.path.join(clone_dir, item)
    if item == ".git":
        continue
    if os.path.isdir(item_path):
        shutil.copytree(item_path, dst_path, ignore=shutil.ignore_patterns(".git"))
    else:
        shutil.copy2(item_path, dst_path)

print("Files in clone:")
for item in sorted(os.listdir(clone_dir)):
    if item != ".git":
        print(f"  {item}")

# Add all, commit, push
print("\nAdding files...")
subprocess.run(["git", "add", "-A"], check=True, cwd=clone_dir)

print("\nCommitting...")
result = subprocess.run(["git", "commit", "-m", "Update THETA Lab website"], capture_output=True, text=True, cwd=clone_dir)
print(result.stdout)
print(result.stderr)

print("\nPushing to main...")
subprocess.run(["git", "push", "origin", "main"], check=True, cwd=clone_dir)
print("\nDONE! Successfully pushed to nwj6688.github.io main branch!")
