<template>
    <div class="container py-2">
        <main>
            <div class="row row-cols-1 row-cols-md-3 mb-3">

                <div class="col">
                    <img :src="imageUrl" id="logo-amazon" alt="Logo Amazon">
                    <div class="card mb-4 rounded-3 shadow-sm">
                        <div class="card-body">
                            <h2 class="my-2 fw-bold">Crear cuenta</h2>
                            <form>
                                <div class="mb-3">
                                    <label for="username" class="col-form-label fw-bold">Tu nombre</label>
                                    <input type="text" class="form-control" id="username" v-model="user.name" :class="{ 'is-invalid': validation.errors.name && validation.errors.name.length > 0 }" @input="clearError('name')">
                                    <p class="text-danger" v-if="validation.errors.name && validation.errors.name.length > 0"><i class="bi bi-exclamation"></i>{{ validation.errors.name[0] }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="col-form-label fw-bold">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="email" v-model="user.email" :class="{ 'is-invalid': validation.errors.email && validation.errors.email.length > 0 }" @input="clearError('email')">
                                    <p class="text-danger" v-if="validation.errors.email && validation.errors.email.length > 0"><i class="bi bi-exclamation"></i>{{ validation.errors.email[0] }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="col-form-label fw-bold">Contraseña</label>
                                    <input type="password" class="form-control" id="password" v-model="user.password" :class="{ 'is-invalid': validation.errors.password && validation.errors.password.length > 0 }" @input="clearError('password')">
                                    <p class="text-danger" v-if="validation.errors.password && validation.errors.password.length > 0"><i class="bi bi-exclamation"></i>{{ validation.errors.password[0] }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="password_confirmation" class="col-form-label fw-bold">Confirmar nueva contraseña</label>
                                    <input type="password" class="form-control" id="password_confirmation" v-model="user.password_confirmation" :class="{ 'is-invalid': validation.errors.password_confirmation && validation.errors.password_confirmation.length > 0 }" @input="clearError('password_confirmation')">
                                    <p class="text-danger" v-if="validation.errors.password_confirmation && validation.errors.password_confirmation.length > 0"><i class="bi bi-exclamation"></i>{{ validation.errors.password_confirmation[0] }}</p>

                                </div>
                                <button type="button" class="btn text-dark btn-warning" @click="createUser" style="width: 100%;">Crear tu cuenta de amazon</button>
                            </form>
                            <div class="col-12 mt-4">
                                <p>Al crear una cuenta, aceptas las <a href="#" class="text-decoration-none">Condiciones de Uso</a> y e
                                    <a href="#" class="text-decoration-none">Aviso de Privacidad</a> de Amazon.
                                </p>
                            </div>
                        </div>
                        <div class="card-footer border-0 text-muted ">
                            <p style="padding-top: 20px;">¿Ya tienes cuenta? <a href="#" class="text-decoration-none">Iniciar sesión</a></p>
                        </div>
                    </div>
                </div>
                <div class="col-12" style="width: 50%;">
                    <div class="card mb-4 w-100 border-0 h-100 d-flex flex-column">
                        <div class="card-body">
                            <UserList ref="userList"></UserList>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<style>

    #logo-amazon{

        width: 180px; height: auto; display: block; margin: 0 auto;

    }

    .card-footer {
        position: relative;
        padding-top: 10px;
        background-color: transparent !important;
    }
    .card-footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.125);
    }
</style>

<script>

import axios from 'axios';
import UserList from "../user/UserList.vue";
import { ref } from 'vue';

// Constante para traer logo de amazon
const imageUrl = ref('');

// Traer logo de amazon
import('../../assets/images/logoAmazonMexico.png').then(m => {
    imageUrl.value = m.default;
});

export default {
    name: 'userView',
    data() {
        return {

        imageUrl: imageUrl,
        validation: {
            errors: {}
        },
        user: {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
        users: [],

        }
    },
    components: {
        UserList
    },
    mounted() {
        //
    },
    methods: {
        cleanInputs(){
            this.user = {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
            this.validation.errors = {};
        },
        async createUser() {

            const route = '/user/create';

            // Gestión campos registrar usuario
            const formData = new FormData();

            const arrayUser = ['name', 'email', 'password', 'password_confirmation'];

            arrayUser.forEach((element) => {

                formData.append(element, this.user[element]);

            })

            await axios.post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {

                const toast = response.data;

                this.successUpdate(toast)

                this.cleanInputs();

                // Actualizar la lista de usuarios después de crear uno nuevo en la vista userList
                this.$refs.userList.getUsers();

            }).catch(error => {

                if (error.response && error.response.status === 422) {
                    const toast = error.response.data.errors;

                    this.validation.errors = toast;
                    // Handle validation errors here
                } else {
                    console.error("Error updating user:", error);
                    // Handle other errors here
                }

            })

        },
        successUpdate(toast){

            this.$swal.fire({
                title: 'Registrado!',
                text: `${toast.success}`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false // No mostrará el botón de confirmación "OK"
            });

        },
        handleFileChange(event) {
            // Cuando se selecciona un archivo, lo agregamos al array de archivos en el modelo de datos
            this.user.files = Array.from(event.target.files);
        },
        clearError(fieldName) {
            if (this.validation.errors[fieldName] && this.validation.errors[fieldName].length > 0) {
                this.validation.errors[fieldName] = [];
            }
        }
    }
}
</script>
