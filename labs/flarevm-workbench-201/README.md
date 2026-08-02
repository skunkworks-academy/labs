# LAB-FLR-201 — FLARE VM Analysis Workbench

An intermediate, browser-only learning lab that teaches the safety and evidence workflow around a Windows reverse-engineering workbench. The page includes synthetic, pre-recorded tool output only; it does not install FLARE VM or execute a file.

## Learner flow

1. Choose the managed virtual-machine and snapshot model.
2. Preserve static observations with fixture, tool and output provenance.
3. Read a simulated process/file/network timeline without initiating any connection.
4. Complete the six-question knowledge check and create a local learning record.

## Safety boundary

- FLARE VM’s upstream project is intended only for a virtual machine.
- Do not install it on a learner’s host, personal workstation or production system.
- This lab does not ask a learner to disable endpoint protection, download an installer or handle a malware sample.

## Future hands-on runtime

The future runtime is a staff-built Windows VM image, delivered through the Labs control plane with no public IP, restricted networking, approved fixtures, per-session disposal and mandatory snapshot/reset cleanup.

## References

- FLARE VM project: https://github.com/mandiant/flare-vm
- FLARE Learning Hub: https://github.com/mandiant/flare-learning-hub
- Instructor guide: [instructor-guide.md](./instructor-guide.md)
