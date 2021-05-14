import React from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios');

const App = () => {

  const [news, setNews] = useState([]);
  const [modal, setModal] = useState(false);
  const [formNew, setFormNew] = useState({
    title: '',
    description: '',
    category: '',
    link: '',
    image: ''
  });

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
  const toggle = () => setModal(!modal);

  useEffect(()=>{
    const fetchData = async () =>{
      await axios.get('https://peaceful-cerulean-judge.glitch.me/', )
                                .then((fetchedData) =>{
                                  setNews(fetchedData.data);
                                });
    }
    fetchData();
  }, []);
  
  return (
     <div className="App">
      <header className="App-header">
      <Button color="danger" onClick={toggle}>Add Notíca  </Button>
      <Table bordered hover>
        <thead>
        <tr>
            <th className="tema">Tema</th>
            <th className='titulo'>Título</th>
            <th className='descricao'>Descrição</th>
            <th className='link'>Link</th>
            <th className='imagem'>Link de Imagem</th>
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
            </tr>)
          })
        }
        </tbody>
      </Table>
      

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
      </header>
    </div>
  )
}

export default App;