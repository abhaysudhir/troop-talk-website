import SwiftUI

struct ContentView: View {
    @State private var isLoggedIn = false
    
    var body: some View {
        if isLoggedIn {
            ChatView()
        } else {
            LoginView(isLoggedIn: $isLoggedIn)
        }
    }
}