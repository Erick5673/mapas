import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat: number = -21.53549;
  lng: number = -64.7295609;

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) { 
    /* const nuevoMarcador = new Marcador(-21.53549, -64.7295609);
    this.marcadores.push( nuevoMarcador); */
    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse( localStorage.getItem('marcadores') );
    }
  }

  ngOnInit() {
  }

  agregarMarcador( evento ) {
    const coords: { lat: number, lng: number } = evento.coords;
    
    //console.log(evento.coords.lat);
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push( nuevoMarcador);
    this.guardarStorange();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 } );
  }
  
  borrarMarcador( i: number ){ 
    //console.log(i);
    this.marcadores.splice(i,1);
    this.guardarStorange();
    this.snackBar.open('Marcadpr Borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador( marcador: Marcador ) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if ( !result ) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorange();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 } );

    });
  }

  guardarStorange(){
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ));
    //this.snackBar.open('Marcadpr Agregado', 'Cerrar', { duration: 3000 });
  }

  
  

}
