<template lang='html'>

  <modal :title="crudController.newModalTitle"  :show.sync="showModal" effect="fade" large>
    <div slot="modal-body" class="modal-body">
      <div class="container-fluid">

        <form>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="email">Nome</label>
                <input type="text" class="form-control" id="name" v-model="collection.name" placeholder="Nome">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="collection.email" placeholder="Email">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" class="form-control" id="password" v-model="collection.password" placeholder="Senha">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Confirmação da senha</label>
                <input type="password" class="form-control" id="password" v-model="passwordCheck" placeholder="Repita a senha">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="showModal = false">
        <span class='glyphicon glyphicon-off' aria-hidden='true'></span> Sair
      </button>
      <button type="button" class="btn btn-success" @click="showModal = false">
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
            <i class='glyphicon glyphicon-search icon-search'></i>
            <input type='text' class='form-control input-lg' placeholder='Informe um texto para filtrar...' />
        </div>
      </div>
    </div>

    <div class='row'>
      <div class='col-md-12'>
        <table class='table'>
          <thead>
            <tr class='active'>
              <th>
                coluna 1
              </th>
              <th>
                coluna 2
              </th>
              <th>
                coluna 2
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='checkbox' class='lg'>
                <button type='button' class='btn btn-info btn-xs' aria-label='visualizar'>
                  <span class='glyphicon glyphicon-search' aria-hidden='true'></span>
                </button>
                <button type='button' class='btn btn-warning btn-xs' aria-label='editar'>
                  <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>
                </button>
                <button type='button' class='btn btn-danger btn-xs' @click='removeAny("99999")' aria-label='excluir'>
                  <span class='glyphicon glyphicon-trash' aria-hidden='true'></span>
                </button>
              </td>
              <td>
                valor c2
              </td>
              <td>
                valor c3
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td>
                valor c2
              </td>
              <td>
                valor c3
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td>
                valor c2
              </td>
              <td>
                valor c3
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
        <button type='button' class='btn btn-primary btn-lg' @click='showModal = !showModal'>
          <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span> Novo
        </button>
        <button type='button' class='btn btn-danger btn-lg' @click='removeAny()'>
          <span class='glyphicon glyphicon-trash' aria-hidden='true'></span> Excluir
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { dropdown, modal } from 'vue-strap'

export default {

  data () {
    return {
      collection: {
        email: '',
        user: '',
        password: '',
        admin: false,
        active: true
      },
      showModal: false,
      crudController: {
        newModalTitle: 'Novo usuário'
      }
    }
  },
  computed: {
    // charts: []
  },
  ready () {
  },
  attached () {},
  methods: {
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
    }
  },
  components: {
    dropdown,
    modal
  },
  vuex: {
    getters: {
      // charts: state => state.Dashboard.charts,
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

</style>
