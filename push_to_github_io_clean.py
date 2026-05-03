import shutil, os, subprocess

clone_dir = r"d:\nwj6688_github_io"

# Remove cleanup scripts from source first
cleanup_files = ["push_to_github_io.py", "push_to_github_io_final.py", "push_to_github_io_clean.py"]

# Delete everything except .git
print("Cleaning working directory...")
for item in os.listdir(clone_dir):
    item_path = os.path.join(clone_dir, item)
    if item == ".git":
        continue
    if os.path.isdir(item_path):
        shutil.rmtree(item_path)
    else:
        os.remove(item_path)

# Recopy only from THETA-Lab-Website
src = r"d:\CIVS2026-1-RLtuibian\THETA-Lab-Website"
print("Recopying files from THETA-Lab-Website...")
for item in os.listdir(src):
    item_path = os.path.join(src, item)
    dst_path = os.path.join(clone_dir, item)
    if item == ".git":
        continue
    if os.path.isdir(item_path):
        shutil.copytree(item_path, dst_path, ignore=shutil.ignore_patterns(".git"))
    else:
        shutil.copy2(item_path, dst_path)

print("\nFiles to commit:")
for item in sorted(os.listdir(clone_dir)):
    if item != ".git":
        print(f"  {item}")

# Remove cleanup scripts if they got copied
for f in cleanup_files:
    fp = os.path.join(clone_dir, f)
    if os.path.exists(fp):
        os.remove(fp)

# Add, commit, force push
print("\nAdding files...")
subprocess.run(["git", "add", "-A"], check=True, cwd=clone_dir)

print("\nChecking status...")
result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True, cwd=clone_dir)
print(result.stdout)

print("\nCommitting...")
subprocess.run(["git", "commit", "-m", "Update THETA Lab website (clean version)"], cwd=clone_dir)

print("\nForce pushing...")
subprocess.run(["git", "push", "-f", "origin", "main"], check=True, cwd=clone_dir)
print("\nDONE!")
