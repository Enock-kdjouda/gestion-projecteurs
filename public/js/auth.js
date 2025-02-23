// Fonction de connexion
async function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            updateNavigation(true);
            showPage('projectors');
        } else {
            alert(data.error || 'Erreur de connexion');
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
}

// Fonction d'inscription
async function register(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            showPage('login');
        } else {
            alert(data.error || 'Erreur lors de l\'inscription');
        }
    } catch (error) {
        alert('Erreur lors de l\'inscription');
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('token');
    updateNavigation(false);
    showPage('login');
}

// Mise à jour de la navigation
function updateNavigation(isLoggedIn) {
    document.getElementById('loginBtn').style.display = isLoggedIn ? 'none' : 'inline-block';
    document.getElementById('registerBtn').style.display = isLoggedIn ? 'none' : 'inline-block';
    document.getElementById('projectorsBtn').style.display = isLoggedIn ? 'inline-block' : 'none';
    document.getElementById('reservationsBtn').style.display = isLoggedIn ? 'inline-block' : 'none';
    document.getElementById('logoutBtn').style.display = isLoggedIn ? 'inline-block' : 'none';
}