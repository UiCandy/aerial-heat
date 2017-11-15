export const slugify = function(str) {
    return str.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const regExp = function(slug){
    return new RegExp(`^(?=.*\\b${slug[0]}\\b)(?=.*\\b${slug[1] || ' ?'}\\b).*$`, "gi")
};