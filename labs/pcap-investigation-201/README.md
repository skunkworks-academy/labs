# LAB-NET-201 - Wireshark PCAP Investigation

An evidence-led introduction to packet review. Learners read a fictional, stored capture summary and practise finding a DNS lookup, TCP handshake, session close and a defensible follow-up question.

## What learners practise

- Packet-timeline reading and flow correlation.
- TCP SYN, SYN-ACK, ACK and FIN/ACK semantics.
- DNS query/response interpretation.
- Display-filter reasoning without live traffic collection.
- Evidence-note quality: timestamp, filter, observation and scope.

## Delivery and safety

- Level: Intermediate
- Duration: 60 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and printable personal completion record
- Runtime: No PCAP is downloadable, no live capture is enabled and no target interaction occurs.

All addresses and domains are documentation-only values in a fictional training dataset.

## Files

- index.html - learner-facing interactive workbook
- manifest.yaml - delivery, learning and safety metadata
- instructor-guide.md - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open http://localhost:8080/labs/pcap-investigation-201/.
