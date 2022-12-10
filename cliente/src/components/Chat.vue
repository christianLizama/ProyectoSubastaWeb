<template>
    <div class="contendorGrande">
        <!-- <h1>Subasta de : {{ subasta.producto.nombreProducto }}</h1> -->
        <h1>Subasta de : {{ nombreP }}</h1>
        <h2 v-if="this.subasta.producto != null">Monto inicial: {{ this.subasta.producto.montoInicial }}</h2>

        <h2 v-if="this.subasta.ultimaPuja != null">Ultimo monto Pujado:{{ this.subasta.ultimaPuja.monto }}</h2>
        <h2 v-else>Ultimo monto Pujado: Aún no hay ofertas.</h2>

        <div v-if="martillero == 'martillero'" class="botonTerminar">
            <vs-button>
                <span class="material-icons-outlined">
                    gavel
                </span>

                Finalizar Subasta
            </vs-button>
        </div>
        <div class="contenedorChat">


            <div class="participantes">
                <h3>Participantes Activos</h3>
                <div v-for="(item, index) in participantes" :key="index">
                    {{ item }}
                </div>

            </div>
            <div class="chat" id="chat" ref="chat">
                <div v-for="(item, index) in this.subasta.chat.pujas" :key="index">

                    <div class="left" v-if="(item.usuario.nombreUsuario != $store.state.usuarioLogeado.nombreUsuario)">
                        <vs-button color="#3B4254">
                            {{ item.usuario.nombreUsuario }} : {{ item.monto }}
                        </vs-button>
                    </div>

                    <div class="right" v-if="item.usuario.nombreUsuario == $store.state.usuarioLogeado.nombreUsuario">
                        <vs-button color="#5576D4">
                            {{ item.usuario.nombreUsuario }} : {{ item.monto }}
                        </vs-button>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="martillero != 'martillero'" class="enviar">

            <vs-input dark state="dark" @keyup.enter="enviarPuja" v-model="value5"
                label-placeholder="Ingrese un monto para pujar" />
            <vs-button @click="enviarPuja" color="#39E37F">Enviar Puja</vs-button>
        </div>

        <p v-if="martillero != 'martillero'">Nota: El monto de ser superior que la ultima puja.</p>
    </div>
</template>

<script>
import SocketioService from '../services/socketio.service.js';
export default {
    data() {
        return {
            value5: '',
            puja: {
                usuario: null,
                monto: null,
                fecha: null,
                id: null
            },
            subasta: null,
            mensajes: [],
            nombreP: "",
            participantes: [],
        };
    },
    created() {
        this.getSubasta()
        SocketioService.setupSocketConnection();
        SocketioService.broadcast();
        console.log(this.martillero)
        this.obtenerParticipantes()
        /* this.obtenerUltimaPuja() */
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
    mounted() {
        this.obtenerMsj()
    },
    props: {
        subastaActiva: {},
        martillero: ""
    },
    methods: {
        getSubasta() {
            this.axios.get('/subasta/' + this.subastaActiva._id)
                .then((res) => {
                    this.subasta = res.data
                    this.nombreP = res.data.producto.nombreProducto
                    var objDiv = document.getElementById("chat")
                    objDiv.scrollTop = objDiv.scrollHeight
                })
                .catch((e) => {
                    console.log(e.response);
                })
        },
        enviarPuja() {

            const puja = {
                usuario: null,
                monto: null,
                fecha: null,
                id: null
            }

            puja.usuario = this.$store.state.usuarioLogeado
            puja.monto = this.value5
            puja.fecha = Date.now()
            puja.id = this.subasta._id



            if (this.subasta.ultimaPuja == null) {
                const valor1 = parseInt(this.subasta.producto.montoInicial)
                const valor2 = parseInt(puja.monto)
                if (valor2 > valor1) {
                    this.subasta.ultimaPuja = puja
                    this.enviarMensaje(puja)
                    this.openNotification("top-right", "success", "Exito!", "Puja aceptada.")

                }
                else {
                    this.openNotification("top-right", "danger", "Aviso", "Solo se aceptan pujas superiores al ultimo monto fijado.")
                }
            }
            else {

                const valor1 = parseInt(this.subasta.ultimaPuja.monto)
                const valor2 = parseInt(puja.monto)

                if (valor2 > valor1) {
                    this.subasta.ultimaPuja = puja
                    this.enviarMensaje(puja)
                    this.openNotification("top-right", "success", "Exito!", "Puja aceptada.")

                }
                else {
                    this.openNotification("top-right", "danger", "Aviso", "Solo se aceptan pujas superiores al ultimo monto fijado.")
                }


            }




        },
        actualizarSubasta() {
            this.axios.put('/subasta/' + this.subasta._id, this.subasta)
                .then(res => {
                    console.log("Se actulizo el chat")

                    this.obtenerParticipantes()

                    var objDiv = document.getElementById("chat")
                    objDiv.scrollTop = objDiv.scrollHeight
                })
                .catch((e) => {
                })
        },
        obtenerMsj() {
            SocketioService.socket.on(
                "mensaje:recibido", (data) => {
                    if (this.subasta._id == data.id) {
                        this.subasta.chat.pujas.push(data)
                        this.actualizarSubasta()


                    }
                }
            )
        },
        enviarMensaje(puja) {
            SocketioService.sendMessage(puja);
            this.subasta.ultimaPuja = puja

        },
        obtenerParticipantes() {

            this.subastaActiva.chat.pujas.forEach(element1 => {
                const aux = true

                this.participantes.push(element1.usuario.nombreUsuario)
            });

            const dataArr = new Set(this.participantes);

            this.participantes = [...dataArr];

        },
        openNotification(position = null, color, titulo, texto) {
            const noti = this.$vs.notification({
                sticky: true,
                color,
                position,
                title: titulo,
                text: texto
            })
        },
        bajarScroll() {
            /* var e = document.getElementById('chat');
            //Le añado otro mensaje
            e.innerHTML += '<div class="chat"></div>';
            e.innerHTML += '<div class="chat"></div>'; */
            //Llevo el scroll al fondo
            var objDiv = document.getElementById("chat")
            objDiv.scrollTop = objDiv.scrollHeight
            /* this.$refs["chat"].$el.scrollIntoView({ behavior: 'smooth' }); */
        }
    },

};
</script>

<style scoped>
.contendorGrande {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    text-align: center;
}

h1 {
    position: relative;
    text-align: center;
}

.contenedorChat {
    display: flex;
    position: relative;
    justify-content: center;
}

.chat {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgba(182, 182, 182, 0.214);
    width: 40%;
    height: 57vh;
    margin-bottom: 20px;
    overflow-y: scroll;
    /* overflow-x: hidden; */

}

.right {
    float: right;
}

.participantes {
    position: relative;
    width: 30%;
    color: aliceblue;
    background-color: #222f54;
    text-align: center;

    margin-bottom: 20px;
}

.enviar {
    display: flex;
    justify-content: right;
    position: relative;
    right: 15%;

}

.enviar .vs-button {
    position: relative;
}

input {
    border: none;
    position: relative;
    margin-top: 5px;
    margin-left: 5px;
    width: 20%;
    color: aliceblue;
    background-color: #222f54;
    text-align: center;
}

.botonTerminar {
    display: flex;
    justify-content: center;
}
</style>