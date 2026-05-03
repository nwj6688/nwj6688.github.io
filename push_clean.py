import os, shutil, subprocess

clone_dir = r"d:\nwj6688_github_io"
src_dir = r"d:\CIVS2026-1-RLtuibian\THETA-Lab-Website"

# Step 1: Delete everything except .git from clone
print("Step 1: Cleaning working directory...")
for item in os.listdir(clone_dir):
    if item == ".git":
        continue
    item_path = os.path.join(clone_dir, item)
    if os.path.isdir(item_path):
        shutil.rmtree(item_path)
    else:
        os.remove(item_path)

# Step 2: Copy only files from THETA-Lab-Website (just the files, not the directory)
print("Step 2: Copying website files...")
for item in os.listdir(src_dir):
    if item == ".git":
        continue
    src = os.path.join(src_dir, item)
    dst = os.path.join(clone_dir, item)
    if os.path.isdir(src):
        shutil.copytree(src, dst, ignore=shutil.ignore_patterns(".git"))
    else:
        shutil.copy2(src, dst)

# Step 3: Remove cleanup scripts if they got copied
for f in os.listdir(clone_dir):
    if f.startswith("push") and f.endswith(".py"):
        os.remove(os.path.join(clone_dir, f))

# Step 4: Remove nwj6688_github_io_new if present
p = os.path.join(clone_dir, "nwj6688_github_io_new")
if os.path.exists(p):
    if os.path.isdir(p):
        shutil.rmtree(p)
    else:
        os.remove(p)

# Step 5: Remove README.md from root if it's not the right one
print("Step 5: Showing final contents...")
for item in sorted(os.listdir(clone_dir)):
    if item == ".git":
        continue
    print(f"  {item}")

# Step 6: Git operations
print("\nStep 6: Git operations...")
subprocess.run(["git", "add", "-A"], check=True, cwd=clone_dir)

# Check if there's anything to commit
result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True, cwd=clone_dir)
print("Status:")
print(result.stdout)

if result.stdout.strip():
    subprocess.run(["git", "commit", "-m", "Clean: remove PaperForge and submodule, keep only website files"], cwd=clone_dir)
    print("\nPushing...")
    subprocess.run(["git", "push", "-f", "origin", "main"], check=True, cwd=clone_dir)
    print("DONE! Push successful.")
else:
    print("Nothing to commit.")
