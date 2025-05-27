export const baseStyles = `
  <style>
    @media only screen and (max-width: 600px) {
      .button-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;
      }
      .button-container a {
        width: 100% !important;
        text-align: center !important;
        margin: 0 !important;
      }
    }
  </style>
`;

export function emailWrapper(content: string): string {
  return `
    ${baseStyles}
    <div style="background-color: #0e0e0e; color: #ffffff; font-family: 'Rajdhani', sans-serif; padding: 2rem; border-radius: 1rem; max-width: 600px; margin: auto;">
      ${content}
    </div>
  `;
}
