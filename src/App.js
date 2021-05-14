import React from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios');

const App = () => {

  //////////////////Login Hooks
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [logged, setLogged] = useState(false);

  const handleLogin = async () =>{
    try{
      const resp = await axios.post('https://peaceful-cerulean-judge.glitch.me/login', login);
      
      if(resp.data[0].username === 'admin')
        setLogged(true);
      
      setLogin({
        username : '',
        password : ''
      });  

    } catch(err){
      console.log(err);
      setLogin({
        username : '',
        password : ''
      });  
    }
  };

  //////////////////Table Hooks
  const [news, setNews] = useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
      await axios.get('https://peaceful-cerulean-judge.glitch.me/', )
                                .then((fetchedData) =>{
                                  setNews(fetchedData.data);
                                });
    }
    fetchData();
  }, []);
  

  //////////////////Delete Hooks
  const [deleteNew, setDeleteNew] = useState('');
  const [modalDelete, setModalDelete] = useState(false);

  const handleDeleteModal =  (title) =>{
    console.log("oi");
    toggleDelete();
    setDeleteNew(title);  
  }

  const toggleDelete = () => {setModalDelete(!modalDelete)}

  const handleDelete = async () =>{
    try{
      const resp = await axios.post('https://peaceful-cerulean-judge.glitch.me/delete', {title:deleteNew});
      if(resp.data.protocol41){
        alert("Deletado");
      }
      else{
        alert("erro");
      }
      setDeleteNew('');
      toggleDelete();
    } catch (err){
      console.log(err);
    }
  }

  /////////////////Add Hooks
  const [modal, setModal] = useState(false);
  const [formNew, setFormNew] = useState({
    title: '',
    description: '',
    category: '',
    link: '',
    image: ''
  });

  const toggle = () => setModal(!modal);

  const handleAddNew = async () =>{
    console.log(formNew);
    if(formNew.category !== ''){
      try{
          const resp = await axios.post('https://peaceful-cerulean-judge.glitch.me/add', formNew);
          console.log(resp.data);
      } catch(err){
        console.log(err);
      }
    }
    
    setFormNew({
      title: '',
      description: '',
      category: '',
      link: '',
      image: ''
    });
    toggle();
  };

  

  ///////////////Return
  return (
     <div className="App">
      <header className="App-header">
      {/*Add Notícia Button*/}  
      {logged && <Button color="danger" onClick={toggle}>Adicionar Notícia  </Button>}

      {/*Login Form*/}
      {!logged && 
        <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="loginText" className="mr-sm-2">Login</Label>
                  <Input type="text" name="loginText" id="loginText" style={{width:'30%'}} value={login.username} onChange={e => setLogin({...login, username:e.target.value})}/>
                </FormGroup>             
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="passwordText" className="mr-sm-2">Password</Label>
                  <Input type="password" name="passwordText" id="passwordText" style={{width:'30%'}} value={login.password} onChange={e => setLogin({...login, password:e.target.value})}/>
                </FormGroup>            
              <Button onClick={handleLogin}>Sign In</Button>            
        </Form>
      }
      </header>
      <body>
      {/*Tabela com as notícias*/}
      <Table bordered hover>
        <thead>
        <tr>
            <th className="tema">Tema</th>
            <th className='titulo'>Título</th>
            <th className='descricao'>Descrição</th>
            <th className='link'>Link</th>
            <th className='imagem'>Link de Imagem</th>
            {logged &&<th className="actions">Ações</th>}
        </tr>
        </thead>
        <tbody>
        
        { news.length > 0 &&
          news.map((result, i) => {
            return(
            <tr key={i}>
              <td className='tema'>{result.category}</td>
              <td className='titulo'>{result.title}</td>
              <td className='descricao'>{result.description}</td>
              <td className='link'>{result.link}</td>
              <td className='imagem'>{result.image}</td>
              {logged &&<td className='actions'>
                <Button color="danger" onClick={()=>handleDeleteModal(result.title)}>Delete</Button>
              </td>}
            </tr>)
          })
        }
        </tbody>
      </Table>
      
      {/*Modal de Adicionar Notícia*/}  
      <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <span>Adicione uma notícia no bot</span>
          <Form>
            <FormGroup>
              <Label>Tema</Label>
              <Input type='select' name='temaText' id='temaText' value={formNew.category} onChange={e=>setFormNew({...formNew,category:e.target.value})}>
                <option></option>
                <option>Política</option>
                <option>Esportes</option>
                <option>Famosos</option>
                <option>Entretenimento</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Título</Label>
              <Input type="textarea" name="tituloText" id='tituloText' value={formNew.title} onChange={e=>setFormNew({...formNew,title:e.target.value})}/> 
            </FormGroup>
            <FormGroup>
              <Label>Descrição</Label>
              <Input type="textarea" name="descricaoText" id="descricaoText" value={formNew.description} onChange={e=>setFormNew({...formNew,description:e.target.value})}/>
            </FormGroup>
            <FormGroup>
              <Label>Link</Label> 
              <Input type="textarea" name="linkText" id="linkText" value={formNew.link} onChange={e=>setFormNew({...formNew,link:e.target.value})}/>
            </FormGroup>
            <FormGroup>
              <Label>Link de Imagem</Label>
              <Input type="textarea" name="imageText" id="imageText" value={formNew.image} onChange={e=>setFormNew({...formNew,image:e.target.value})}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddNew}>Adicionar Notícia</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>


      {/*Modal de Deletar Notícia*/}  
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalBody>
          <span>Deseja excluir essa notícia?</span>
          <p>{deleteNew}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Deletar</Button>
          <Button color="secondary" onClick={() => {setDeleteNew('');toggleDelete()}}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      </body>
    </div>
  )
}

export default App;