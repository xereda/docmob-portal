<template lang='html'>

  <modal :show.sync="control.modal.show" effect="fade" large>

    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">
        {{ control.modal.title }}
      </h4>
    </div>

    <div slot="modal-body" class="modal-body">
      <div class="container-fluid">

        <form>
          <form-group :valid.sync="valid.all">
            <div class="row">
              <div class="col-md-6">
                <bs-input type="text" :value.sync="collection.name" label="Nome" error="Informe corretamente o nome!" placeholder="Informe o nome" pattern="^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$" :mask="mask" minlength="5" required icon></bs-input>
              </div>
              <div class="col-md-6">
                <bs-input type="email" :disabled="control.modal.state === 'UPDATE'" :value.sync="collection.email"  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" label="E-mail" error="Informe um e-mail válido!" placeholder="Informe o e-mail" minlength="5" required icon></bs-input>
              </div>
            </div>
            <div class="row"  v-if="control.modal.state === 'NEW'">
              <div class="col-md-6">
                <bs-input type="password" :value.sync="collection.password" label="Senha" error="Informe corretamente a senha!" placeholder="Informe a senha do usuário" minlength="5" required icon></bs-input>
              </div>
              <div class="col-md-6">
                <bs-input :match="collection.password" type="password" label="Repita a senha" error="Informe a mesma senha!" placeholder="Repita a senha do usuário" minlength="5" required icon></bs-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="collection.active"> Ativo?
                  </label>
                </div>
              </div>
              <div class="col-md-2">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="collection.admin"> Administrador?
                  </label>
                </div>
              </div>
            </div>

            <div class="row" style="margin-top: 1.5em;">
              <div class="col-md-12 animated"  v-animation v-if="control.APIError.visible">

                <accordion :one-at-atime="true" type="danger">
                  <panel type="danger">
                    <strong slot="header"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{ control.APIError.title }}</strong>

                    <div v-if="((control.APIError.message.err) && (control.APIError.message.err.errors))">
                      <dl class="row" v-for="e in control.APIError.message.err.errors" >
                        <dt class="col-sm-3">{{ $key }}</dt>
                        <dd class="col-sm-9">{{ e.message }}</dd>
                      </dl>
                    </div>

                    <dl class="row" v-if="((control.APIError.message.error) && (control.APIError.message.error.length > 0))">
                      <dd class="col-sm-12">{{ control.APIError.message.error }}</dd>
                    </dl>

                    <dl class="row" v-if="((control.APIError.message.err) && (control.APIError.message.err.errmsg) && (control.APIError.message.err.errmsg.length > 0))">
                      <dd class="col-sm-12">{{ control.APIError.message.err.errmsg }}</dd>
                    </dl>

                  </panel>
                </accordion>

              </div>
            </div>

          </form-group>
        </form>
      </div>


    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="control.modal.show = false">
        <span class='glyphicon glyphicon-off' aria-hidden='true'></span> Sair
      </button>
      <button type="button" v-if="control.modal.state === 'NEW'" class="btn btn-success" @click="newDoc()" :disabled="(valid.all === false)">
        <span class='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Salvar
      </button>
      <button type="button" v-if="control.modal.state === 'UPDATE'" class="btn btn-success" @click="updateDoc()" :disabled="(valid.all === false)">
        <span class='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Salvar
      </button>
    </div>
  </modal>

  <div class='container'>

    <div class='page-header'>
      <h1><span class='blueText'><i class='glyphicon glyphicon-user'></i> Usuários </span><small>&nbsp;[ Cadastro de usuários do sistema ]</small></h1>
    </div>

    <ol class='breadcrumb'>
      <li><a href='#'><i class='glyphicon glyphicon-home icon-breadcrumb'></i> Home</a></li>
      <li><a href='#'><i class='glyphicon glyphicon-lock icon-breadcrumb'></i> Área Restrita</a></li>
      <li class='active'><i class='glyphicon glyphicon-user icon-breadcrumb'></i> Usuários</li>
    </ol>

    <div class='row margin'>
      <div class='col-md-12'>
        <div class='inner-addon left-addon'>

          <popover effect="fade" placement="bottom" title="PESQUISA" trigger="focus" content="Após digitar o filtro, pressione a tecla 'ENTER' para iniciar a pesquisa.">
              <input type='text' class='form-control input-lg' placeholder='Informe um texto para filtrar...' />
              <i class='glyphicon glyphicon-search icon-search'></i>
          </popover>

        </div>
      </div>
    </div>

    <div class='row' v-show="!control.loading">
      <div class='col-md-12'>
        <table class='table'>
          <thead>
            <tr class='active'>
              <th>
              </th>
              <th class="">
                Nome
              </th>
              <th class="hidden-xs">
                E-mail
              </th>
              <th class="hidden-xs">
                Ativo?
              </th>
              <th class="hidden-xs">
                Administrador?
              </th>
            </tr>
          </thead>
          <tbody>
            <spinner v-ref:spinner size="xl"></spinner>
            <tr v-for="doc in docs" :class="(selecteds.indexOf(doc._id) > -1) ? 'info': ''" style="cursor: pointer;">
              <td>
                <input type='checkbox' class='lg' v-model='selecteds' :value='doc._id'>
                <button type='button' class='btn btn-info btn-xs' aria-label='visualizar'>
                  <span class='glyphicon glyphicon-search' aria-hidden='true'></span>
                </button>
                <button type='button' class='btn btn-warning btn-xs' @click="modalUpdate(doc)" aria-label='editar'>
                  <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>
                </button>
                <button type='button' class='btn btn-danger btn-xs' @click='removeAny("99999")' aria-label='excluir'>
                  <span class='glyphicon glyphicon-trash' aria-hidden='true'></span>
                </button>
              </td>
              <td @click="selectRow(doc._id)" >
                {{ doc.name }}
              </td>
              <td class="hidden-xs" @click="selectRow(doc._id)" >
                {{ doc.email }}
              </td>
              <td class="hidden-xs" @click="selectRow(doc._id)" >
                {{ doc.active ? 'Sim' : 'Não' }}
              </td>
              <td class="hidden-xs" @click="selectRow(doc._id)" >
                {{ doc.admin ? 'Sim' : 'Não' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class='row'>
      <div class='col-md-6 top'>
        <ul class='pagination'>
          <li>
            <a href='#' aria-label='Previous'>
              <span aria-hidden='true'>&laquo;</span>
            </a>
          </li>
          <li><a href='#'>1</a></li>
          <li><a href='#'>2</a></li>
          <li><a href='#'>3</a></li>
          <li><a href='#'>4</a></li>
          <li><a href='#'>5</a></li>
          <li>
            <a href='#' aria-label='Next'>
              <span aria-hidden='true'>&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
      <div class='col-md-6 newButton'>
        <button type='button' class='btn btn-primary btn-lg' @click='modalNew()'>
          <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span> Novo
        </button>
        <button type='button' class='btn btn-danger btn-lg' :disabled="(selecteds.length < 2)" @click='removeAny()'>
          <span class='glyphicon glyphicon-trash' aria-hidden='true'></span> Excluir
        </button>
        <button type='button' class='btn btn-info btn-lg' @click='getAll()'>
          <span class='glyphicon glyphicon-open' aria-hidden='true'></span> Buscar...
        </button>
      </div>
    </div>

    <alert :show.sync="control.APIAlert.visible" placement="top-right" :duration="control.APIAlert.duration" type="danger" :style="'margin-left: 20px;'" dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>{{ control.APIAlert.title }}</strong>
      <p>{{ control.APIAlert.message }}</p>
    </alert>

    {{ $data.collection | json }} <br><br>

  </div>
</template>

<script>
import { dropdown, modal, popover, input, formGroup, alert, spinner, panel, accordion } from 'vue-strap'

import topbar from 'topbar'

export default {

  data () {
    return {
      valid: {
        all: false
      },
      control: {
        loading: false,
        modal: {
          show: false,
          state: '',
          title: ''
        },
        APIAlert: {
          visible: false,
          title: '',
          message: '',
          duration: 5000
        },
        APIError: {
          visible: false,
          title: '',
          message: ''
        }
      },
      selecteds: [],
      docs: [],
      collection: {
        email: '',
        name: '',
        password: '',
        admin: false,
        active: 'true',
        createdById: ''
      },
      passwordCheck: ''
    }
  },
  computed: {
    // charts: []
  },
  ready () {
    this.getAll()
  },
  attached () {},
  methods: {
    selectRow (_id) {
      console.log(_id)
      if (this.selecteds.indexOf(_id) > -1) {
        this.selecteds.splice(this.selecteds.indexOf(_id), 1)
      } else {
        this.selecteds.push(_id)
      }
    },
    getAll () {
      topbar.show()
      this.$refs.spinner.show()

      // GET /someUrl
      this.$http.get('http://localhost:5000/users/?_fields=_id,name,email,active,admin').then((response) => {
        console.log(response.body)
        this.docs = response.body
        topbar.hide()
        this.$refs.spinner.hide()
      }, (response) => {
        // error callback
        console.log('DEU MERDA')

        this.APIAlert(true, 'Acesso a API DocMob', 'Houve um problema ao acessar a API do DocMob. Favor entrar em contato com o administrador do sistema. Obrigado.')

        topbar.hide()
        this.$refs.spinner.hide()
      })
    },
    newDoc () {
      this.collection.createdById = this.user_id

      this.APIAlert(false, '')
      this.APIError(false, '', {})

      // POST /someUrl
      this.$http.post('http://localhost:5000/users', this.collection, { emulateJSON: true }).then((response) => {
        // get status
        console.log(response.status)

        // get status text
        console.log(response.statusText)

        // set data on vm
        this.docs.push(response.body)
      }, (response) => {
        // error callback
        console.log('response: ', response)
        console.log('response.data.err.errors: ', response.data.err.errors)
        this.APIAlert(true, 'Erro com a API', 'Verifique os detalhes do erro no rodapé desta janela.')
        this.APIError(true, 'Erro ao tentar inserir um documento com a API', response.data)
      })
    },
    updateDoc () {
      this.collection.updatedById = this.user_id

      this.APIAlert(false, '')
      this.APIError(false, '', {})

      // POST /someUrl
      this.$http.put('http://localhost:5000/users', this.collection, { emulateJSON: true }).then((response) => {
        // get status
        console.log(response.status)

        // get status text
        console.log(response.statusText)
      }, (response) => {
        // error callback
        console.log('response: ', response)
        if ((response.data) && (response.data.err) && (response.data.err.errors !== undefined)) {
          console.log('response.data.err.errors: ', response.data.err.errors)
        }
        this.APIAlert(true, 'Erro com a API', 'Verifique os detalhes do erro no rodapé desta janela.')
        this.APIError(true, 'Erro ao tentar atualizar um documento com a API', response.data)
      })
    },
    modalNew () {
      this.APIAlert(false, '')
      this.APIError(false, '', {})
      this.collection = {}
      this.passwordCheck = ''
      this.control.APIError.visible = false
      this.control.modal.title = 'Novo usuário'
      this.control.modal.state = 'NEW'
      this.control.modal.show = true
    },
    modalUpdate (doc) {
      console.log('dentro da funcao modalupdate: ', doc)
      this.APIAlert(false, '')
      this.APIError(false, '', {})
      this.collection = doc
      this.control.APIError.visible = false
      this.control.modal.title = 'Atualizando o usuário ' + doc.name
      this.control.modal.state = 'UPDATE'
      this.control.modal.show = true
    },
    removeAny (doc) {
      console.log(doc)
      if (doc === undefined) {
        swal({
          title: 'Deseja remover?',
          text: 'Após remover o registro selecionado, \n você não poderá restaurá-lo!',
          type: 'warning',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Sim, pode remover!',
          cancelButtonText: 'Cancelar',
          closeOnConfirm: false },
          function () {
            setTimeout(() => swal('Removidos!', 'Os registros selecionados foram removidos com sucesso!', 'success'), 1500)
          }
        )
      } else {
        swal({
          title: 'Deseja remover?',
          text: 'Após remover o registro selecionado, \n você não poderá restaurá-lo!',
          type: 'warning',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Sim, pode remover!',
          cancelButtonText: 'Cancelar',
          closeOnConfirm: false },
          function () {
            setTimeout(() => swal('Removido!', 'O registro selecionado foi removido com sucesso!', 'success'), 1500)
          }
        )
      }
    },
    APIAlert (visible, title, message) {
      // define mensagem de alerta sobre o erro no acesso a api
      this.control.APIAlert.visible = visible
      this.control.APIAlert.title = title
      this.control.APIAlert.message = message
    },
    APIError (visible, title, message) {
      // define mensagem de alerta sobre o erro ao tentar inserir um documento com a api
      this.control.APIError.visible = visible
      this.control.APIError.title = title
      this.control.APIError.message = message
    }
  },
  components: {
    dropdown,
    modal,
    popover,
    'bsInput': input,
    formGroup,
    spinner,
    alert,
    panel,
    accordion
  },
  vuex: {
    getters: {
      user_id: state => state.Dashboard.session.user_id
      // token: state => state.token
    }
  }
}
</script>

<style lang='css'>

  /* enable absolute positioning */
  .inner-addon {
      position: relative;
  }

  /* style icon */
  .inner-addon .glyphicon {
    position: absolute;
    padding: 10px;
    pointer-events: none;
  }

  .icon-search {
    font-size: 1.7em;
    color: rgb(207, 207, 207);
  }

  .icon-breadcrumb {
    font-size: 0.9em;
  }

  /* align icon */
  .left-addon .glyphicon  { left:  0px;}
  .right-addon .glyphicon { right: 0px;}

  /* add padding  */
  .left-addon input  { padding-left:  43px; }
  .right-addon input { padding-right: 43px; }

  .margin {
    margin-bottom: 1.5em;
  }

  .newButton {
    text-align: right;
  }

  .blueText {
    color: #337ab7;
  }

  .fullWidth {
    width: 100%;
  }

  .vcenter {
      display: inline-block;
      vertical-align: middle;
      float: none;
      text-align: center;
      height: 10em;
  }

  .animated {
      display: inline-block;
  }

  .animated.v-enter {
      animation: fadein 2s;
  }

  .animated.v-leave {
      animation: fadeout 2s;
  }

  @keyframes fadein {
      0% {
          transform: scale(0);
      }
      50% {
          transform: scale(1.5);
      }
      100% {
          transform: scale(1);
      }
  }

  @keyframes fadeout {
      0% {
          transform: scale(1);
      }
      50% {
          transform: scale(1.5);
      }
      100% {
          transform: scale(0);
      }
  }


</style>
