const token = 'TU_ACCESS_TOKEN'; // Reemplázalo con tu token

async function fetchWebApi(endpoint, method) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method
  });
  return await res.json();
}

// Obtener Top 100 Global de Spotify
async function getTopGlobalTracks() {
  const data = await fetchWebApi(
    'v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks', 'GET'
  );

  return data.items.map(({ track }) => ({
    name: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    url: track.external_urls.spotify,
    image: track.album.images[0]?.url
  }));
}

// Mostrar Top 100 Global en la web
getTopGlobalTracks().then(tracks => {
  const container = document.getElementById("top-100");
  container.innerHTML = tracks.map(track => `
    <div class="track">
      <img src="${track.image}" alt="${track.name}">
      <p><strong>${track.name}</strong> - ${track.artist}</p>
      <a href="${track.url}" target="_blank">Escuchar en Spotify</a>
    </div>
  `).join('');
});

// Cambiar de sección
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}
