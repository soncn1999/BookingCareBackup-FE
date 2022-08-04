export const adminMenu = [
    { //Qly ng dung
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name: 'menu.admin.crud',
                link: '/system/crud',
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin',
                link: '/system/user-admin',
            },
        ]
    },

    { //Qly phong kham
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
            },
        ]
    },

    { //Qly chuyen khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty',
            },
        ]
    },

    { //Qly cam nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook',
            },
        ]
    },
];