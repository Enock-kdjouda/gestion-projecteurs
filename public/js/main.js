// Fonction pour afficher une page spécifique
function showPage(pageId) {
    // Cacher toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Afficher la page demandée
    document.getElementById(`${pageId}Page`).style.display = 'block';

    // Charger les données si nécessaire
    if (pageId === 'projectors') {
        loadProjectors();
    } else if (pageId === 'reservations') {
        loadReservations();
    }
}

// Vérifier l'état de connexion au chargement
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    updateNavigation(!!token);
    showPage(token ? 'projectors' : 'login');
});