# Demonstration visibility

The default public record method selects visibility=public before props leave Laravel. CV public returns public sections only. Extended adds config/academic/restricted.extended; private adds the extended and private fixture sections. Default Home and other page props do not include restricted datasets.

The DEMO dialog is presentation-only. Query routes can be visited directly and implement no authorization. No confidential information may be stored in these mock datasets. The dashboard role switcher affects controls and transitions only; it is not a security boundary.

Approved public records appear in the current workspace preview. Rejected records cannot appear in Approved Records; restricted approved records are omitted from public preview. The original public site configuration is never changed by workspace actions.

Before production add server-side identity, policies, validated projection permissions, credential issuance/expiry/revocation, and audited document access. Never reuse the client code as a credential mechanism.
