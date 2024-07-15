# HrefLister

Just [a webpage](https://alttiri.github.io/href-lister) to list text URLs as clickable hypertexts.

![image](https://user-images.githubusercontent.com/16310547/226176272-8000fd78-1b62-49d0-8252-bbfcac1b36bb.png)

This web application is useful if you have a bulk of links, and you want to visit them in the browser.

It keeps the last link click time, allows you to add tags and comments to the links.

---

It's a standalone web application.

All data is stored/processed only in your browser, no data is sent to external servers.

---

Link parsing is very primitive:

- An URL must starts with `https://`, or `http://`.
- URLs must be separated by space character(s).

A space character(s) with followed `#`, or `//` is used as a start of a line comment:

![image](https://user-images.githubusercontent.com/16310547/226177171-9080121a-8b6a-4130-ab0a-99d79f51a42b.png)

---

### Auto clicking popup

![image](https://github.com/AlttiRi/href-lister/assets/16310547/be0794a6-7831-439f-9f7a-9ddb42b296d2)

The delay is measured in seconds.

### Url Magic Transforms popup


It uses `UrlCleaner` from https://github.com/AlttiRi/string-magic to clean the input URLs.

![uc](https://github.com/user-attachments/assets/65e89496-1809-4e07-adaa-13ce958ddede)

**"Url Cleaner"** simply cleans the URLs.

![uo](https://github.com/user-attachments/assets/64422050-67cf-4231-bcef-d17fdc61766a)

**"Url Origin"** does not clean the URLs in the list, but internally works with the cleaned ones.

It's useful when a link contains some access parameters which change time by time.
If you remove them, the link will be invalid.

For example:
- https://cdn.discordapp.com/attachments/1000789/12556677/Image_34.jpg?ex=667788&is=665544&hm=ab12ac23ef45
- https://cdn.discordapp.com/attachments/1000789/12556677/Image_34.jpg?ex=778899&is=776655&hm=ba21ca32fe54

With "Url Origin" you can _internally_ normalize (clean) the both links to
- https://cdn.discordapp.com/attachments/1000789/12556677/Image_34.jpg

So, the both links will be treated as the exactly same link.
They will share the same last click time, tags, and a comment.

_Also, it's useful when you just don't want to expose to the server that the link was modified,
but you still need to normalize it to keep the last click time (tags, a comment) of the normalized link._
