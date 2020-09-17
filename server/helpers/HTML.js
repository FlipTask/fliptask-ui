const HTML = ({
    linkTags, styleTags, scriptTags, store, html
}) => `
<!doctype html>
<html lang="en">
<head>
    <base href="/" />
    <meta charset="utf-8">
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <meta name="theme-color" content="#242837">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#242837">
    <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png">
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
