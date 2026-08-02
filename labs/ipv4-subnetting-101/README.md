# LAB-NET-101 - IPv4 Subnetting Foundations

An interactive, self-paced browser lab for the IPv4 subnetting concepts commonly introduced in CompTIA Network+, Cisco CCNA, Microsoft networking and general TCP/IP training.

## Learning outcomes

- Understand how bits form bytes and how four 8-bit octets make a 32-bit IPv4 address.
- Interpret a normal CIDR subnet mask: 1 means network bit and 0 means host bit.
- Relate /24, /25, /26, /27, /28 and /30 to binary and dotted-decimal masks.
- Work through a visual /26 example, including its four /26 blocks in a parent /24.
- Calculate total addresses and ordinary usable hosts from the host-bit count.
- Identify the network, usable host range and broadcast address for a /26 address.

## Delivery

- Level: Beginner
- Duration: 35 minutes
- Environment: Any modern desktop or mobile browser
- Sign-in: Not required
- Cloud credentials: Not required
- Evidence: Local browser progress and a printable personal completion record

The completion record is deliberately labelled as a local learning record. It is not an accredited certificate, a verified assessment or a digital badge.

## Accuracy scope

The lab teaches the conventional IPv4 LAN-host calculation:

- Total addresses = 2 raised to the host-bit count
- Ordinary usable hosts = total addresses - 2

It calls out the important /31 and /32 exceptions rather than presenting the subtraction rule as universal. CIDR is used throughout; the learner should determine the network from the prefix and mask, not from retired classful-network assumptions.

## Files

- index.html - learner-facing interactive lab
- lab.css - responsive visual and print styles
- lab.js - interaction, scoring and local-progress logic
- manifest.yaml - product and delivery metadata
- instructor-guide.md - facilitation, assessment and reference guidance

## Local preview

From the repository root, use any static HTTP server, for example:

    python3 -m http.server 8080

Then open http://localhost:8080/labs/ipv4-subnetting-101/.
