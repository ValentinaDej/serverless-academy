export const expirationEmailTemplate = (linkIds: string[]) => {
  const linksText = linkIds
    .map((linkId: string) => `${process.env.HOST_URL}/${linkId}`)
    .join("<br>");

  return `
    <html>
      <head>
           <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
          }
          .email-container {
            background-color: #ffcc00;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          h1 {
            color: #333;
            font-size: 24px;
          }
          p {
            color: #555;
            font-size: 16px;
            margin: 10px 0;
          }
          .links {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <h1>Shortlinker Expiration Notice</h1>
          <p>Dear user,</p>
          <p>We wanted to inform you that the short links you were using have expired. The links are no longer accessible:</p>
          <p class="links">${linksText}</p>
          <p>If you need to create new short links, please visit our <a href="${process.env.HOST_URL}" class="links">Shortlinker service</a>.</p>
          <p>Thank you for using Shortlinker!</p>
        </div>
      </body>
    </html>
  `;
};
