// Fonction pour ajouter une réservation
async function addReservation(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                projector_id: parseInt(formData.get('projector_id')),
                start_time: formData.get('start_time'),
                end_time: formData.get('end_time')
            })
        });

        if (response.ok) {
            event.target.reset();
            loadReservations();
        } else {
            const data = await response.json();
            alert(data.error || 'Erreur lors de la création de la réservation');
        }
    } catch (error) {
        alert('Erreur lors de la création de la réservation');
    }
}

// Fonction pour charger les réservations
async function loadReservations() {
    try {
        const response = await fetch('/reservations', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const reservations = await response.json();
        const container = document.getElementById('reservationsList');
        container.innerHTML = '';

        reservations.forEach(reservation => {
            const startDate = new Date(reservation.start_time).toLocaleString();
            const endDate = new Date(reservation.end_time).toLocaleString();
            
            container.innerHTML += `
                <div class="list-item">
                    <div>
                        <p>Projecteur: ${reservation.projector_name}</p>
                        <p>Du: ${startDate}</p>
                        <p>Au: ${endDate}</p>
                    </div>
                    <button onclick="deleteReservation(${reservation.id})">Annuler</button>
                </div>
            `;
        });
    } catch (error) {
        alert('Erreur lors du chargement des réservations');
    }
}

// Fonction pour supprimer une réservation
async function deleteReservation(id) {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
        return;
    }

    try {
        const response = await fetch(`/reservations/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            loadReservations();
        } else {
            const data = await response.json();
            alert(data.error || 'Erreur lors de l\'annulation de la réservation');
        }
    } catch (error) {
        alert('Erreur lors de l\'annulation de la réservation');
    }
}