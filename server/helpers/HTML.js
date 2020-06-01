const HTML = ({
    linkTags, styleTags, scriptTags, store, html
}) => `
<!doctype html>
<html lang="en">
<head>
    <base href="/" />
    <meta charset="utf-8">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <link rel="shortcut icon" type="image/x-icon" href="/static/icon/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap"
        rel="stylesheet">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

    ${linkTags}
    ${styleTags}
</head>
<body style="margin:0px">
<script>
window.INITIAL_STATE = ${JSON.stringify(store).replace(
        /</g,
        "\\u003c"
    )}
</script>
    <section id="root">${html}</section>
    <section id="root-drawer"></section>
    <section id="root-modal"></section>
    ${scriptTags}
</body>
</html>
    `;

export default HTML;
//    <script src="https://kit.fontawesome.com/179049e472.js" crossorigin="anonymous" async></script>
