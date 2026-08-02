# LAB-NET-102 - DNS, DHCP, ARP and Packet Flow

A full-length, self-paced networking troubleshooting lab. Learners use synthetic traces to understand the dependency chain that takes a device from no address to a resolved name and local Ethernet delivery.

## What learners practise

- DHCP address assignment and the purpose of a lease.
- DNS name resolution and the difference between a name and an IP address.
- ARP as a local-link address-resolution process.
- Reading a simple packet flow in order and isolating the earliest failed dependency.
- Choosing an evidence-led first check instead of guessing, scanning or changing a live network.

## Delivery and safety

- Level: Beginner
- Duration: 55 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and printable personal completion record
- Network: No live packet capture, scanning, DNS lookup or network change occurs.

All names, addresses, hostnames and packet events are fictional training data. The completion record is not an accredited certificate or a verified assessment.

## Files

- index.html - learner-facing interactive workbook
- manifest.yaml - delivery, learning and safety metadata
- instructor-guide.md - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open http://localhost:8080/labs/dns-dhcp-arp-102/.
