export const numintelGuides = [
  {
    slug: 'what-is-e164',
    title: 'What is E.164 Phone Number Format?',
    description: 'A technical guide to the international public telecommunication numbering plan (E.164) and why it is critical for validation.',
    content: `
<h2>Understanding E.164</h2>
<p>E.164 is an international standard established by the ITU (International Telecommunication Union) that defines the format of telephone numbers worldwide. It ensures that every phone number is globally unique and can be successfully routed across different telecommunication networks.</p>

<h3>The Anatomy of an E.164 Number</h3>
<p>An E.164 formatted number can have a maximum of 15 digits and is typically written with a leading plus sign (+).</p>
<p>The structure is:<br><strong>[+] [Country Code] [Subscriber Number including Area Code]</strong></p>
<p>For example, a Nigerian mobile number <code>0803 123 4567</code> becomes <code>+2348031234567</code> in E.164 format. Notice that the leading <code>0</code> (the national trunk prefix) is dropped.</p>

<h3>Why is E.164 Important?</h3>
<p>When building software that sends SMS (like Twilio or AWS SNS) or making API calls to WhatsApp Business, the E.164 format is usually mandatory. Without it, the routing system cannot determine which country the number belongs to, leading to failed deliveries.</p>

<h3>Common E.164 Mistakes</h3>
<ol>
  <li><strong>Keeping the trunk prefix:</strong> Formatting a UK number as <code>+4407911123456</code> instead of the correct <code>+447911123456</code>.</li>
  <li><strong>Adding spaces or dashes:</strong> True E.164 format contains only the plus sign and digits. No spaces, no dashes, no parentheses.</li>
  <li><strong>Exceeding length:</strong> An E.164 number cannot exceed 15 digits (excluding the plus sign).</li>
</ol>
    `,
    relatedTools: ['/numintel/e164-phone-number-validator', '/numintel/international-phone-number-validator'],
    lastUpdated: '2026-09-08'
  },
  {
    slug: 'phone-number-validation',
    title: 'How Phone Number Validation Actually Works',
    description: 'Learn the difference between regex validation, library parsing (like libphonenumber), and active carrier dips.',
    content: `
<h2>Types of Phone Number Validation</h2>
<p>When you enter a phone number into an app or website, "validation" can mean several different things depending on how deep the system checks.</p>

<h3>1. Regex / Pattern Matching (Level 1)</h3>
<p>The simplest validation simply checks if the input looks like a phone number (e.g., contains only numbers, plus signs, and spaces). It is fast but highly inaccurate, as it will accept completely fabricated numbers as long as they contain digits.</p>

<h3>2. Format and Length Parsing (Level 2)</h3>
<p>This is where libraries like Google's <code>libphonenumber</code> come in. They maintain massive metadata files containing the exact numbering plans of every country. If you input a Nigerian number, the library knows it must be 10 digits long (after dropping the 0 trunk prefix). If it's 9 or 11 digits, it's flagged as invalid. This catches most accidental typos.</p>

<h3>3. HLR / Carrier Lookup (Level 3)</h3>
<p>The most definitive validation involves an active network query. An HLR (Home Location Register) lookup queries the telecom network to check if the number is currently active, connected, and which carrier owns it. This is usually a paid service and requires sending the number to a third-party API.</p>

<h3>Why NumIntel uses Level 2 + OSINT</h3>
<p>NumIntel prioritizes privacy and speed. We use advanced parsing to ensure the number mathematically fits the country's numbering plan, and then we augment it with Open Source Intelligence (OSINT) and community reports to detect scams without actively pinging the user's phone.</p>
    `,
    relatedTools: ['/numintel/phone-number-validator'],
    lastUpdated: '2026-09-08'
  },
  {
    slug: 'international-phone-number-format',
    title: 'International vs National Phone Number Formatting',
    description: 'Understand the difference between dialing locally and dialing internationally, and how trunk prefixes work.',
    content: `
<h2>The Difference in Dialing</h2>
<p>Phone numbers are formatted differently depending on where you are dialing from.</p>

<h3>National Format</h3>
<p>This is how you write and dial a number when you are inside the same country. It usually begins with a <strong>trunk prefix</strong> (often <code>0</code> or <code>1</code>).</p>
<ul>
  <li>Example in Ghana: <code>024 123 4567</code></li>
  <li>Example in the US: <code>(212) 555-1234</code> (The US uses 1 as a trunk prefix, but it's often omitted in local dialing).</li>
</ul>

<h3>International Format</h3>
<p>When dialing from outside the country, you must drop the national trunk prefix and append the <strong>country calling code</strong>. You also need an international exit code (like <code>00</code> in Europe or <code>011</code> in the US), but the <code>+</code> symbol universally replaces the exit code on modern mobile phones.</p>
<ul>
  <li>Example in Ghana: <code>+233 24 123 4567</code></li>
</ul>

<h3>The Trunk Prefix Trap</h3>
<p>The most common error in international formatting is keeping the trunk prefix.</p>
<p>If a user in Kenya gives their number as <code>0712 345 678</code>, someone dialing from London should dial <code>+254 712 345 678</code>. If they dial <code>+254 0712...</code>, the call will likely fail because the telecom switch gets confused by the extra zero.</p>
    `,
    relatedTools: ['/numintel/international-phone-number-validator', '/numintel/countries'],
    lastUpdated: '2026-09-08'
  }
];