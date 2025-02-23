// Fonction pour ajouter un projecteur
async function addProjector(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/projectors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: formData.get('name')
            })
        });

        if (response.ok) {
            event.target.reset();
            loadProjectors();
        } else {
            const data = await response.json();
            alert(data.error || 'Erreur lors de l\'ajout du projecteur');
        }
    } catch (error) {
        alert('Erreur lors de l\'ajout du projecteur');
    }
}

// Fonction pour charger les projecteurs
async function loadProjectors() {
    try {
        const response = await fetch('/projectors', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const projectors = await response.json();
        const container = document.getElementById('projectorsList');
        container.innerHTML = '';

        projectors.forEach(projector => {
            container.innerHTML += `
                <div class="list-item">
                    <div>
                        <span>${projector.name}</span>
                        <span>(${projector.is_functional ? 'Fonctionnel' : 'Non fonctionnel'})</span>
                    </div>
                    <div>
                        <button onclick="updateProjectorStatus(${projector.id}, ${!projector.is_functional})">
                            ${projector.is_functional ? 'Marquer comme non fonctionnel' : 'Marquer comme fonctionnel'}
                        </button>
                        <button onclick="deleteProjector(${projector.id})">Supprimer</button>
                    </div>
                </div>
            `;
        });

        // Mise à jour de la liste des projecteurs dans le formulaire de réservation
        const select = document.getElementById('projectorSelect');
        select.innerHTML = '<option value="">Sélectionnez un projecteur</option>';
        projectors.forEach(projector => {
            if (projector.is_functional) {
                select.innerHTML += `<option value="${projector.id}">${projector.name}</option>`;
            }
        });
    } catch (error) {
        alert('Erreur lors du chargement des projecteurs');
    }
}

// Fonction pour mettre à jour le statut d'un projecteur
async function updateProjectorStatus(id, isFunctional) {
    try {
        const response = await fetch(`/projectors/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                is_functional: isFunctional
            })
        });

        if (response.ok) {
            loadProjectors();
        } else {
            const data = await response.json();
            alert(data.error || 'Erreur lors de la mise à jour du projecteur');
        }
    } catch (error) {
        alert('Erreur lors de la mise à jour du projecteur');
    }
}

// Fonction pour supprimer un projecteur
async function deleteProjector(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projecteur ?')) {
        return;
    }

    try {
        const response = await fetch(`/projectors/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            loadProjectors();
        } else {
            const data = await response.json();
            alert(data.error || 'Erreur lors de la suppression du projecteur');
        }
    } catch (error) {
        alert('Erreur lors de la suppression du projecteur');
    }
}