function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)]
}

function getNRandomItems(items, n, songsToSkip) {
    const nRandomitems = []
    while (nRandomitems.length < n) {
        const randomItem = getRandomItem(items);
        if (!songListIncludes(nRandomitems, randomItem) && !songListIncludes(songsToSkip, randomItem)) {
            nRandomitems.push(randomItem);
        }
    }
    return nRandomitems;
}

function songListIncludes(songList, song) {
    return songList.map((songData) => songData.id).includes(song.id);
}

function renderBear(trackData) {
    renderSubHeader();
    renderMenu(trackData);
}

function renderSubHeader() {
    $('#date-sub-header').html(`Chef's listening menu | ${getTodayDate()}`);
}

function getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate());
    const dayOfTheWeek = today.toLocaleDateString('default', { weekday: 'long' });

    const month = today.toLocaleString('default', { month: 'long' });
    return `${dayOfTheWeek}, ${month} ${dd}`;
}

function renderFooter(totalDuration) {
    console.log(totalDuration);
    $('#menu-footer').html(`Prix Fixe ${totalDuration}<br>Service Included`);
}


function renderMenu(trackData) {
    var songsToSkip = [];
    const randomMediumTermSongs = getNRandomItems(trackData.mediumTermSongs, 3, songsToSkip); // main courses
    songsToSkip = songsToSkip.concat(randomMediumTermSongs);
    const randomLongTermSongs = getNRandomItems(trackData.longTermSongs, 1, songsToSkip); // uhh the thing after main course but not dessert
    songsToSkip = songsToSkip.concat(randomLongTermSongs);
    const randomShortTermSongs = getNRandomItems(trackData.shortTermSongs, 1, songsToSkip); // appetizer
    songsToSkip = songsToSkip.concat(randomShortTermSongs);
    const randomRecommendedSongs = getNRandomItems(trackData.recommendedSongs, 1, songsToSkip)
    $('#menu-body').append("<div class='section-label'><b>Starter</b></div>");
    $('#menu-body').append(createMenuItem(randomShortTermSongs[0]));
    $('#menu-body').append("<hr>");
    $('#menu-body').append("<div class='section-label'><b>Main courses</b></div>");
    $('#menu-body').append(createMenuItem(randomMediumTermSongs[0]));
    $('#menu-body').append(createMenuItem(randomMediumTermSongs[1]));
    $('#menu-body').append(createMenuItem(randomMediumTermSongs[2]));
    $('#menu-body').append("<hr>");
    $('#menu-body').append("<div class='section-label'><b>Dessert</b></div>");
    $('#menu-body').append(createMenuItem(randomLongTermSongs[0]));
    $('#menu-body').append("<hr>");
    $('#menu-body').append("<div class='section-label'><b>Chef's choice</b></div>");
    $('#menu-body').append(createMenuItem(randomRecommendedSongs[0]));
    $('#menu-body').append("<hr>");
    console.log(randomShortTermSongs[0]);
    const totalDurationInMs = randomShortTermSongs[0].duration_ms +
        randomMediumTermSongs[0].duration_ms +
        randomMediumTermSongs[1].duration_ms +
        randomMediumTermSongs[2].duration_ms +
        randomLongTermSongs[0].duration_ms +
        randomRecommendedSongs[0].duration_ms;
    const totalDuration = convertMsToDuration(totalDurationInMs, false);
    renderFooter(totalDuration);
}


function convertMsToDuration(ms, verbose) {
    const minutes = Math.round(ms / 60000)
    var seconds = Math.round((ms / 1000) % 60)
    if (!verbose && seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes} minutes and ${seconds} seconds`;
}

function createMenuItem(songData) {
    const durationString = convertMsToDuration(songData.duration_ms);
    return `
        <div class="menu-item">
            <div class="menu-item-title">${songData.title}</div>
            <div class="menu-item-value">${songData.artist} - ${durationString}</div>
        </div>
    `;
}

export default renderBear;