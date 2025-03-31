function getRandomItem(items) {
    return items[Math.floor(Math.random()*items.length)]
}

function getNRandomItems(items, n, songsToSkip) {
    const nRandomitems = []
    while (nRandomitems.length < n) {
        const randomItem = getRandomItem(items);
        if (!nRandomitems.includes(randomItem) && !songsToSkip.includes(randomItem)) {
            nRandomitems.push(randomItem);
        }
    }
    return nRandomitems;
}

function renderBear(trackData) {
    var songsToSkip = [];
    const randomMediumTermSongs = getNRandomItems(trackData.mediumTermSongs, 3, songsToSkip); // main courses
    songsToSkip = songsToSkip.concat(randomMediumTermSongs);
    const randomLongTermSongs = getNRandomItems(trackData.longTermSongs, 1, songsToSkip); // uhh the thing after main course but not dessert
    songsToSkip = songsToSkip.concat(randomLongTermSongs);
    const randomShortTermSongs = getNRandomItems(trackData.shortTermSongs, 1, songsToSkip); // appetizer
    songsToSkip = songsToSkip.concat(randomShortTermSongs);
    const randomRecommendedSongs = getNRandomItems(trackData.recommendedSongs, 1, songsToSkip)
    $('#menu-body').append(createMenuItem(randomShortTermSongs[0]));
    $('#menu-body').append("<hr>");
    $('#menu-body').append(createMenuItem(randomMediumTermSongs[0]));
    $('#menu-body').append(createMenuItem(randomMediumTermSongs[1]));
    $('#menu-body').append(createMenuItem(randomMediumTermSongs[2]));
    $('#menu-body').append("<hr>");
    $('#menu-body').append(createMenuItem(randomLongTermSongs[0]));
    $('#menu-body').append("<hr>");
    $('#menu-body').append(createMenuItem(randomRecommendedSongs[0]));
    $('#menu-body').append("<hr>");
}

function createMenuItem(songData) {
    return `
        <div class="menu-item">
            <div class="menu-item-title">${songData.title}</div>
            <div class="menu-item-value">${songData.artist} - ${songData.duration}</div>
        </div>
    `;
}

export default renderBear;