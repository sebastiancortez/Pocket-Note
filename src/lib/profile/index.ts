export function generateinboxId() {
    return crypto.randomUUID();
    // return Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit unique random identifier
}