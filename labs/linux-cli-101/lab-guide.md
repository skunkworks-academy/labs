# LAB-LNX-101 - Linux Command-Line Essentials

## Learner profile

- Level: Beginner
- Delivery: Browser terminal
- Duration: 45 minutes
- Prerequisites: None
- Evidence: Four automated checkpoints and one short reflection

## Learning outcomes

By the end of this lab, you can:

1. Navigate Linux directories safely using absolute and relative paths.
2. Create, inspect, copy, move, and remove files and directories.
3. Read and search text from the command line.
4. Explain why file permissions support least privilege.

## Rules of engagement

- Work only inside `/home/learner/workspace`.
- Do not attempt to install packages, change users, or modify system directories.
- The session ends after 45 minutes or 10 minutes of inactivity.
- Your environment is reset after the session; copy any permitted notes before it expires.

## Task 1 - Orient yourself

```bash
pwd
ls -la
cd ~/workspace
mkdir -p projects/alpha notes archive
find . -maxdepth 2 -type d | sort
```

Checkpoint: `lab-check filesystem-navigation`

Expected evidence: `projects/alpha`, `notes`, and `archive` exist inside the workspace.

## Task 2 - Manage files deliberately

```bash
printf 'Linux labs build practical confidence.\n' > notes/lesson.txt
cp notes/lesson.txt projects/alpha/lesson-copy.txt
mv projects/alpha/lesson-copy.txt projects/alpha/brief.txt
touch archive/.keep
ls -la notes projects/alpha archive
```

Checkpoint: `lab-check file-and-directory-operations`

Expected evidence: the source note remains in `notes`, and a renamed copy exists in `projects/alpha`.

## Task 3 - Inspect and search text

```bash
cat notes/lesson.txt
printf 'network=restricted\naccess=browser-only\ncleanup=automatic\n' > projects/alpha/lab-policy.txt
grep -n 'access' projects/alpha/lab-policy.txt
grep -nE 'restricted|automatic' projects/alpha/lab-policy.txt
```

Checkpoint: `lab-check text-inspection`

Expected evidence: you can identify the line that sets the browser-only access policy.

## Task 4 - Understand permissions

```bash
ls -l notes/lesson.txt
chmod 640 notes/lesson.txt
ls -l notes/lesson.txt
```

Checkpoint: `lab-check permissions-awareness`

Reflection: In one sentence, describe what `640` allows the owner, group, and other users to do. Do not change permissions outside the workspace.

## Completion

Run:

```bash
lab-check all
```

If all checkpoints pass, capture the completion result before the session ends. A completion record demonstrates task completion; it is not a substitute for an accredited assessment where one is required.

## Instructor notes

- Review the final `find` and `ls -l` output during facilitation.
- Use the permissions task to introduce least privilege, not to teach privileged escalation.
- For a cohort, issue one isolated session per learner and do not reuse terminal environments between learners.
