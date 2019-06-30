import React, { Component } from 'react';
import { Container, Content } from './styles';
import {uniqueId} from 'lodash';
import GlobalStyle from '../../styles';
import Upload from '../../components/Upload';
import FileList from '../../components/FileList';
import api from '../../services/api';

class Envio extends Component {
    state = {
        uploadedFiles: []
    }

    handleUpload = files => {
        const uploadedFiles = files.map( file => ({
            file,
            id: uniqueId(),
            name: file.name,
            progress: 0,
            uploaded: false,
            error: false,
            resultado: ''
        }));

        this.setState({
            uploadedFiles : this.state.uploadedFiles.concat(uploadedFiles)
        });

        uploadedFiles.forEach(this.processUpload);
    };
    updateFile = (id, data) => {
        this.setState({ uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? {...uploadedFile, ...data}: uploadedFile;
        })})
    }

    processUpload = (uploadedFile) => {
        const data = new FormData();
        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('bulas/upload',data,{
            onUploadProgress: e =>{
                const progress = parseInt(Math.round((e.loaded*100)/e.total));
                this.updateFile(uploadedFile.id,{progress});
            }
        }).then(response => {
            this.updateFile(uploadedFile.id, {
                uploaded: true
            });
        }).catch(() => {
            this.updateFile(uploadedFile.id, {
                error:true
            })
        })
    }

    render() {
        const {uploadedFiles} = this.state;

        return (
             
                <Container>
                    <Content>
                        <Upload onUpload={this.handleUpload}/>
                        { !!uploadedFiles.length && (<FileList files={uploadedFiles}/>) }
                    </Content>
                    <GlobalStyle />
                </Container>
        )
    }
}

export default Envio;