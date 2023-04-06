const storage = window.localStorage;

export const recentlyWatchedSave = (id) => {
    let saved;
    if (!storage.getItem("recentlyWatched")) {
        saved = [id]
        storage.setItem("recentlyWatched", JSON.stringify(saved));
    } else {
        saved = JSON.parse(storage.getItem("recentlyWatched"));
        if (!saved.some(el => el === id)) {
            if (saved.length > 4) {
                saved.shift();
                saved.push(id);
            } else saved.push(id);
            storage.setItem("recentlyWatched", JSON.stringify(saved));
        }
    }
}

export const getRecentlyWatched = () => {
    return storage.getItem("recentlyWatched") ? JSON.parse(storage.getItem("recentlyWatched")).reverse().slice(1) : []
}