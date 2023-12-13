export function cleanSlug(url: string) {
    return (url || '')
      .trim()
      .replace(/[^a-zA-Z0-9-_ ]|,/g, '')
      .replace(/ /g, '-')
      .toLowerCase();
  }
  