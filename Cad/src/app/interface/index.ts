// Generated by https://quicktype.io

// Estructura para la tabla de usuarios
export interface Usuario {
    id_usuario?: number;
    nombre: string;
    nombre_usuario: string;
    correo_electronico: string;
    contrasena: string;
    rol: string;
    estado_cuenta: 'activo' | 'inactivo' | 'suspendido';
    fecha_creacion: string;
    ultimo_acceso: string ;
    telefono: string ;
    direccion: string ;
    ciudad: string ;
    estado_provincia: string ;
    pais: string ;
    codigo_postal: string ;
}

// Estructura para la tabla de productos
export interface TopLevel {
    id_prod?: number;
    nombre: string ;
    tipo: string ;
    sku: string ;
    caducidad: string ;
    descripcion: string ;
    stock: number ;
    correo_electronico: string;
}

// Estructura para la tabla de tokens
export interface Token {
    id_token?: number;
    correo_electronico: string;
    token: string;
    estatus: 'abierta' | 'cerrada';
    fecha_creacion: string;
}
