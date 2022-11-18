<template>

    <div class="contenedor">
        <h3>Hola para continuar debe inicia sesion</h3>

        <vs-row justify="center">
            <vs-col w="2">
                <vs-input label="Nombre de usuario" v-model="userName" />


                <vs-input label="Contraseña" @keyup.enter="listarUsuarios" v-model="pass" type="password" />
                <vs-button @click="listarUsuarios">
                    Iniciar Sesion
                </vs-button>

            </vs-col>
        </vs-row>

    </div>
</template>

<script>
export default {


    data() {
        return {
            userName: "",
            pass: "",
            usuarios: []
        };
    },

    methods: {
        listarUsuarios() {

            this.axios.get(this.$store.getters.getLocalhost + '/usuario')
                .then((res) => {
                    // console.log(response.data)
                    this.usuarios = res.data
                    var logearse = false
                    this.usuarios.forEach(element => {

                        if (element.userName == this.userName) {
                            logearse = true
                            if (element.pass == this.pass) {
                                this.openNotification("top-right", "success", "Exito", "Inicio de sesión correctamente.")


                                if (element.rol == "Cliente") {
                                    this.$store.state.usuarioLogeado = element
                                    this.$router.push({ path: '/cliente' })
                                }
                                else {
                                    this.$store.state.usuarioLogeado = element
                                    this.$router.push({ path: '/admin' })
                                }
                            }
                            else {
                                this.openNotification("top-right", "danger", "Error", "Contraseña incorrecta.")
                            }
                        }




                    });
                    if (logearse == false) {

                        this.openNotification("top-right", "danger", "Error", "El usuario no existe.")
                    }

                })
                .catch((e) => {
                    console.log(e);
                    console.log("Servidor desconectado")
                    if (this.$store.state.port == "5000") {
                        this.$store.state.port = "3000"
                    }
                    else if (this.$store.state.port == "3000") {
                        this.$store.state.port = "5000"
                    }
                    

                    this.listarUsuarios();
                })
        },
        openNotification(position = null, color, titulo, texto) {
            const noti = this.$vs.notification({
                sticky: true,
                color,
                position,
                title: titulo,
                text: texto
            })
        }

    },
};
</script>

<style scoped>
.contenedor {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
}

.vs-input-parent {
    padding: 10px;
}

.vs-button {
    position: relative;
    left: 50px;
}
</style>