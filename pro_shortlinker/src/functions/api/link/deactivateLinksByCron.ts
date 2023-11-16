import LinkService from "../../../services/linkService";

export const handler = async () => {
  const links = await LinkService.getExpiredLinks();

  if (links && links.length) {
    const linksByEmail = links.reduce((acc, item) => {
      if (!acc[item.email]) {
        acc[item.email] = [];
      }
      acc[item.email].push(item.id);
      return acc;
    }, {});

    for (const email in linksByEmail) {
      await LinkService.deleteLinks(email, linksByEmail[email]);
    }
  }
};
