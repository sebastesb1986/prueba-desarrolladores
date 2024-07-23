<template>
    <main class="container py-5">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users.data" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Paginación -->
        <div class="mt-auto pt-5 d-flex" style="min-height: 50px;">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ 'disabled': !users.prev_page_url }">
                        <a class="page-link" @click.prevent="getUsers(users.prev_page_url)" href="#">Anterior</a>
                    </li>
                    <li class="page-item" :class="{ 'disabled': !users.next_page_url }">
                        <a class="page-link" @click.prevent="getUsers(users.next_page_url)" href="#">Siguiente</a>
                    </li>
                </ul>
            </nav>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'userList',

    data() {
        return {
            users: [],
        };
    },

    mounted() {
        // Obtener usuarios desde la URL actual (primera página)
        this.getUsers();
    },

    methods: {
        async getUsers(url = '/users?page=1') {
            try {
                const response = await axios.get(url);
                this.users = response.data.users;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
};
</script>
