 const API_URL = 'https://be-android-test01.onrender.com/api/users';

        // Load 
        document.addEventListener('DOMContentLoaded', () => {
            loadUsers();
        });

        // submit 
        document.getElementById('userForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const userId = document.getElementById('userId').value;
            
            if (userId) {
                await updateUser(userId);
            } else {
                await createUser();
            }
        });

        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            resetForm();
        });

        // CREATE 
        async function createUser() {
            const username = document.getElementById('username').value;
            const age = parseInt(document.getElementById('age').value);

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, age })
                });

                if (response.ok) {
                    const user = await response.json();
                    showMessage(`Đã thêm user: ${user.username}`, 'success');
                    resetForm();
                    loadUsers();
                } else {
                    showMessage('Lỗi khi thêm user', 'error');
                }
            } catch (error) {
                showMessage('Không thể kết nối API: ' + error.message, 'error');
            }
        }

        // READ users
        async function loadUsers() {
            try {
                const response = await fetch(API_URL);
                const users = await response.json();

                const userList = document.getElementById('userList');
                
                if (users.length === 0) {
                    userList.innerHTML = `
                        <div class="empty-state">
                            <h3>Chưa có user nào</h3>
                        </div>
                    `;
                    return;
                }

                userList.innerHTML = users.map(user => `
                    <div class="user-item">
                        <div class="user-info">
                            <div class="user-id">ID: ${user.id}</div>
                            <div class="user-name">${user.username}</div>
                            <div class="user-age">${user.age} tuổi</div>
                        </div>
                        <div class="user-actions">
                            <button class="btn-small btn-update" onclick="editUser(${user.id}, '${user.username}', ${user.age})">
                                Sửa
                            </button>
                            <button class="btn-small btn-delete" onclick="deleteUser(${user.id})">
                                Xóa
                            </button>
                        </div>
                    </div>
                `).join('');
            } catch (error) {
                showMessage('✗ Không thể tải danh sách users: ' + error.message, 'error');
            }
        }

        // UPDATE 
        async function updateUser(id) {
            const username = document.getElementById('username').value;
            const age = parseInt(document.getElementById('age').value);

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, age })
                });

                if (response.ok) {
                    showMessage(`Đã cập nhật user ID: ${id}`, 'success');
                    resetForm();
                    loadUsers();
                } else {
                    showMessage('Lỗi khi cập nhật user', 'error');
                }
            } catch (error) {
                showMessage('Không thể kết nối API: ' + error.message, 'error');
            }
        }

        // DELETE 
        async function deleteUser(id) {
            // if (!confirm(`Bạn có chắc muốn xóa user ID: ${id}?`)) {
            //     return;
            // }

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    showMessage(`✓ Đã xóa user ID: ${id}`, 'success');
                    loadUsers();
                } else {
                    showMessage('✗ Lỗi khi xóa user', 'error');
                }
            } catch (error) {
                showMessage('✗ Không thể kết nối API: ' + error.message, 'error');
            }
        }


        function editUser(id, username, age) {
            document.getElementById('userId').value = id;
            document.getElementById('username').value = username;
            document.getElementById('age').value = age;
            document.getElementById('formTitle').textContent = 'Sửa ';
            document.getElementById('submitBtn').textContent = 'Cập Nhật';
            document.getElementById('cancelBtn').style.display = 'block';
        }

        // Reset form về trạng thái thêm mới
        function resetForm() {
            document.getElementById('userForm').reset();
            document.getElementById('userId').value = '';
            document.getElementById('formTitle').textContent = 'Thêm User';
            document.getElementById('submitBtn').textContent = 'Thêm User';
            document.getElementById('cancelBtn').style.display = 'none';
        }

        // Hiển thị thông báo
        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = `<div class="message ${type}">${text}</div>`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 4000);
        }